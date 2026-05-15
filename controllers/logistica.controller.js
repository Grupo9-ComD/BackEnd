import fs from "fs/promises"; 
import path from "path"; 
import { fileURLToPath } from "url"; 
import Logistica from "../models/logistica.model.js";

// Configuración de rutas absolutas para ES Modules
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const rutaArchivo = path.join(__dirname, "../data/logistica.json"); 
const rutaTransacciones = path.join(__dirname, "../data/transacciones.json");

// ==========================================
// FUNCIONES DE LECTURA/ESCRITURA (ASÍNCRONAS)
// ==========================================
const leerOperaciones = async () => { 
    try { 
        const data = await fs.readFile(rutaArchivo, "utf-8"); 
        return JSON.parse(data); 
    } catch (error) { 
        return []; 
    } 
};

const leerTransacciones = async () => { 
    try { 
        const data = await fs.readFile(rutaTransacciones, "utf-8"); 
        return JSON.parse(data); 
    } catch (error) { 
        return []; 
    } 
};

const guardarOperaciones = async (operaciones) => { 
    await fs.writeFile(rutaArchivo, JSON.stringify(operaciones, null, 2)); 
};

// ==========================================
// RUTAS API CRUD
// ==========================================

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
        
        if(operacion){
            res.json(operacion);
        } else {
            res.status(404).json({ error: "Operación no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno" });
    }
};

// CREATE 
const crearOperacion = async (req, res) => { 
    try { 
        const transacciones = await leerTransacciones(); 
        const operaciones = await leerOperaciones();
        
        // TODO: Acá tenés que agregar el resto de tu lógica de alta...

        res.status(201).json({ mensaje: "Lógica de creación pendiente" });
    } catch (error) {
        res.status(500).json({ error: "Error al crear la operación" });
    }
};

// UPDATE 
const actualizarOperacion = async (req, res) => { 
    try { 
        const operaciones = await leerOperaciones(); 
        const idBuscado = parseInt(req.params.id); 
        const index = operaciones.findIndex(o => o.id === idBuscado);
        
        // TODO: Acá tenés que agregar el resto de tu lógica de actualización...

        res.status(200).json({ mensaje: "Lógica de actualización pendiente" });
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

        // TODO: Acá tenés que agregar el resto de tu lógica de eliminación...

        res.status(200).json({ mensaje: "Lógica de eliminación pendiente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar" });
    }
};

// ==========================================
// NUEVAS FUNCIONES PARA LAS VISTAS PUG
// ==========================================
const obtenerLogisticaVista = async (req, res) => { 
    try { 
        const logistica = await leerOperaciones(); 
        res.render("logistica/list", { logistica }); 
    } catch (error) { 
        res.status(500).send("Error al renderizar la vista"); 
    } 
}; 

const formularioNuevaLogistica = async (req, res) => { 
    try { 
        res.render("logistica/form"); 
    } catch (error) { 
        res.status(500).send("Error al cargar el formulario"); 
    } 
};

// EXPORTACIÓN MODERNA (ES Modules)
export { 
    obtenerLogistica, 
    obtenerOperacionPorId, 
    crearOperacion, 
    actualizarOperacion, 
    eliminarOperacion,
    obtenerLogisticaVista, 
    formularioNuevaLogistica   
};