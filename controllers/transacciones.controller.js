import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";
import Transaccion from "../models/transaccion.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaArchivo = path.join(__dirname, "../data/transacciones.json"); 
const rutaTiendas = path.join(__dirname, "../data/tiendas.json"); 

const leerTransacciones = async () => { 
    try {
        const data = await fs.readFile(rutaArchivo, "utf-8"); 
        return JSON.parse(data);
    } catch (error) { return []; }
};

const leerTiendas = async () => { 
    try {
        const data = await fs.readFile(rutaTiendas, "utf-8"); 
        return JSON.parse(data);
    } catch (error) { return []; }
};

const guardarTransacciones = async (transacciones) => { 
    await fs.writeFile(rutaArchivo, JSON.stringify(transacciones, null, 2)); 
};

// GET ALL 
const obtenerTransacciones = async (req, res) => { 
    try {
        const transacciones = await leerTransacciones();
        res.json(transacciones); 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener las transacciones" });
    }
};

// GET BY ID 
const obtenerTransaccionPorId = async (req, res) => {
    try {
        const transacciones = await leerTransacciones();
        const idBuscado = parseInt(req.params.id);
        const transaccion = transacciones.find(t => t.id === idBuscado);
        
        if (!transaccion) return res.status(404).json({ error: "Transacción no encontrada" });
        res.json(transaccion);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener transacción" });
    }
};

// CREATE 
const crearTransaccion = async (req, res) => { 
    try {
        const transacciones = await leerTransacciones();
        const tiendas = await leerTiendas(); 
        
        const idTiendaBuscada = parseInt(req.body.id_tienda); 
        const tiendaExiste = tiendas.find(t => t.id === idTiendaBuscada);
        
        if (!tiendaExiste || tiendaExiste.estado === "Inactiva") {
            return res.status(400).json({ error: "La tienda indicada no existe o está inactiva." });
        }

        const montoTotal = parseFloat(req.body.monto_total);
        const montoPasarela = parseFloat(req.body.monto_informado_pasarela);

        // Lógica de Negocio: Split y Conciliación
        const comisionTechRetail = montoTotal * 0.05; 
        const ingresoComercio = montoTotal - comisionTechRetail;

        let estadoConciliacion = montoTotal === montoPasarela ? "Conciliado OK" : "Inconsistencia Detectada";
        let observacion = montoTotal === montoPasarela ? "Sin diferencias en el flujo monetario" : "El monto real difiere de lo informado por la pasarela";

        const nuevoId = transacciones.length > 0 ? Math.max(...transacciones.map(t => t.id)) + 1 : 1;

        // POO al instanciar
        const nuevaTransaccion = new Transaccion(
            nuevoId,
            idTiendaBuscada,
            tiendaExiste.id_comercio || null, 
            new Date().toISOString(),
            montoTotal,
            montoPasarela,
            { comision_techretail: comisionTechRetail, ingreso_comercio: ingresoComercio },
            estadoConciliacion,
            observacion,
            "Activa"
        );

        transacciones.push(nuevaTransaccion);
        await guardarTransacciones(transacciones);

        res.status(201).json(nuevaTransaccion);
    } catch (error) {
        res.status(500).json({ error: "Error interno al crear transacción" });
    }
};

// UPDATE 
const actualizarTransaccion = async (req, res) => {
    try {
        const transacciones = await leerTransacciones();
        const idBuscado = parseInt(req.params.id);
        const index = transacciones.findIndex(t => t.id === idBuscado);

        if (index === -1) return res.status(404).json({ error: "Transacción no encontrada" });

        transacciones[index] = { ...transacciones[index], ...req.body, id: idBuscado };
        await guardarTransacciones(transacciones);

        res.json({ mensaje: "Transacción actualizada", transaccion: transacciones[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};

// DELETE 
const eliminarTransaccion = async (req, res) => {
    try {
        const transacciones = await leerTransacciones();
        const idBuscado = parseInt(req.params.id);
        const index = transacciones.findIndex(t => t.id === idBuscado);

        if (index === -1) return res.status(404).json({ error: "Transacción no encontrada" });

        transacciones[index].estado = "Inactiva"; // Baja Lógica
        await guardarTransacciones(transacciones);

        res.json({ mensaje: "Transacción dada de baja lógicamente", transaccion: transacciones[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};

export { obtenerTransacciones, obtenerTransaccionPorId, crearTransaccion, actualizarTransaccion, eliminarTransaccion };
