import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";
import Tienda from "../models/tienda.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaArchivo = path.join(__dirname, "../data/tiendas.json"); 
const rutaComercios = path.join(__dirname, "../data/comercios.json");

const leerTiendas = async () => { 
    try {
        const data = await fs.readFile(rutaArchivo, "utf-8"); 
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const leerComercios = async () => { 
    try {
        const data = await fs.readFile(rutaComercios, "utf-8"); 
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const guardarTiendas = async (tiendas) => { 
    await fs.writeFile(rutaArchivo, JSON.stringify(tiendas, null, 2)); 
};

// GET ALL 
const obtenerTiendas = async (req, res) => { 
    try {
        const tiendas = await leerTiendas();
        res.json(tiendas); 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener tiendas" });
    }
};

// GET BY ID 
const obtenerTiendaPorId = async (req, res) => {
    try {
        const tiendas = await leerTiendas();
        const idBuscado = parseInt(req.params.id);
        const tienda = tiendas.find(t => t.id === idBuscado);
        
        if (!tienda) {
            return res.status(404).json({ error: "Tienda no encontrada" });
        }
        res.json(tienda);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener la tienda" });
    }
};

// CREATE 
const crearTienda = async (req, res) => { 
    try {
        const comercios = await leerComercios();
        const tiendas = await leerTiendas();
        
        const idComercioAsociado = parseInt(req.body.id_comercio);
        const comercioExiste = comercios.find(c => c.id === idComercioAsociado);

        // Validación: La tienda solo se crea si el comercio existe y está Activo
        if (!comercioExiste || comercioExiste.estado === "Inactivo") {
            return res.status(400).json({ error: "El comercio indicado no existe o está inactivo." });
        }

        const nuevoId = tiendas.length > 0 ? Math.max(...tiendas.map(t => t.id)) + 1 : 1;
        
        // POO al instanciar el modelo
        const nuevaTienda = new Tienda(
            nuevoId,
            req.body.nombre_sucursal,
            idComercioAsociado,
            req.body.ubicacion,
            "Activa"
        );

        tiendas.push(nuevaTienda);
        await guardarTiendas(tiendas);

        res.status(201).json({ mensaje: "Tienda creada con éxito", tienda: nuevaTienda });
    } catch (error) {
        res.status(500).json({ error: "Error interno al crear tienda" });
    }
};

// UPDATE 
const actualizarTienda = async (req, res) => {
    try {
        const tiendas = await leerTiendas();
        const idBuscado = parseInt(req.params.id);
        const index = tiendas.findIndex(t => t.id === idBuscado);

        if (index === -1) {
            return res.status(404).json({ error: "Tienda no encontrada para actualizar" });
        }

        tiendas[index] = { ...tiendas[index], ...req.body, id: idBuscado };
        await guardarTiendas(tiendas);

        res.json({ mensaje: "Tienda actualizada con éxito", tienda: tiendas[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la tienda" });
    }
};

// DELETE (BAJA LOGICA) 
const eliminarTienda = async (req, res) => {
    try {
        const tiendas = await leerTiendas();
        const idBuscado = parseInt(req.params.id);
        const index = tiendas.findIndex(t => t.id === idBuscado);

        if (index === -1) {
            return res.status(404).json({ error: "Tienda no encontrada para dar de baja" });
        }

        // Baja lógica
        tiendas[index].estado = "Inactiva";
        await guardarTiendas(tiendas);

        res.json({ mensaje: "Tienda dada de baja lógica exitosamente", tienda: tiendas[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tienda" });
    }
};

export { 
    obtenerTiendas, obtenerTiendaPorId, crearTienda, actualizarTienda, eliminarTienda 
};