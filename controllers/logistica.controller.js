import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";
import Logistica from "../models/logistica.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaArchivo = path.join(__dirname, "../data/logistica.json"); 
const rutaTransacciones = path.join(__dirname, "../data/transacciones.json");

const leerOperaciones = async () => { 
    try {
        const data = await fs.readFile(rutaArchivo, "utf-8"); 
        return JSON.parse(data);
    } catch (error) { return []; }
};

const leerTransacciones = async () => { 
    try {
        const data = await fs.readFile(rutaTransacciones, "utf-8"); 
        return JSON.parse(data);
    } catch (error) { return []; }
};

const guardarOperaciones = async (operaciones) => { 
    await fs.writeFile(rutaArchivo, JSON.stringify(operaciones, null, 2)); 
};

// GET ALL 
const obtenerLogistica = async (req, res) => { 
    try {
        const operaciones = await leerOperaciones(); 
        res.json(operaciones); 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener logística" });
    }
};

// GET BY ID 
const obtenerOperacionPorId = async (req, res) => {
    try {
        const operaciones = await leerOperaciones();
        const idBuscado = parseInt(req.params.id);
        const operacion = operaciones.find(o => o.id === idBuscado);
        
        if (!operacion) return res.status(404).json({ error: "Operación no encontrada" });
        res.json(operacion);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener operación" });
    }
};

// CREATE 
const crearOperacion = async (req, res) => {
    try {
        const transacciones = await leerTransacciones();
        const operaciones = await leerOperaciones();
        
        const idTransaccionAsociada = parseInt(req.body.id_transaccion);
        const transaccionExiste = transacciones.find(t => t.id === idTransaccionAsociada);

        // Validación cruzada
        if (!transaccionExiste || transaccionExiste.estado === "Inactiva") {
            return res.status(400).json({ error: "La transacción indicada no existe o está inactiva." });
        }

        const nuevoId = operaciones.length > 0 ? Math.max(...operaciones.map(o => o.id)) + 1 : 1;

        // POO al instanciar
        const nuevaOperacion = new Logistica(
            nuevoId,
            idTransaccionAsociada,
            req.body.empresa_transporte,
            req.body.direccion_destino,
            "Pendiente", // Estado del envío
            "Activa" // Estado lógico del registro
        );

        operaciones.push(nuevaOperacion);
        await guardarOperaciones(operaciones);

        res.status(201).json({ mensaje: "Operación logística creada", operacion: nuevaOperacion });
    } catch (error) {
        res.status(500).json({ error: "Error al crear operación" });
    }
};

// UPDATE 
const actualizarOperacion = async (req, res) => {
    try {
        const operaciones = await leerOperaciones();
        const idBuscado = parseInt(req.params.id);
        const index = operaciones.findIndex(o => o.id === idBuscado);

        if (index === -1) return res.status(404).json({ error: "Operación no encontrada" });

        operaciones[index] = { ...operaciones[index], ...req.body, id: idBuscado };
        await guardarOperaciones(operaciones);

        res.json({ mensaje: "Operación actualizada", operacion: operaciones[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar" });
    }
};

// DELETE 
const eliminarOperacion = async (req, res) => {
    try {
        const operaciones = await leerOperaciones();
        const idBuscado = parseInt(req.params.id);
        const index = operaciones.findIndex(o => o.id === idBuscado);

        if (index === -1) return res.status(404).json({ error: "Operación no encontrada" });

        operaciones[index].estado_logico = "Inactiva"; // Baja Lógica
        await guardarOperaciones(operaciones);

        res.json({ mensaje: "Operación dada de baja lógicamente", operacion: operaciones[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};

export { obtenerLogistica, obtenerOperacionPorId, crearOperacion, actualizarOperacion, eliminarOperacion };