import fs from "fs/promises"; 
import path from "path"; 
import { fileURLToPath } from "url";

// Configuración de rutas absolutas para ES Modules
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

// Estadísticas solo necesita leer las transacciones
const rutaTransacciones = path.join(__dirname, "../data/transacciones.json");

// ==========================================
// FUNCIONES DE LECTURA (ASÍNCRONAS)
// ==========================================
const leerTransacciones = async () => { 
    try { 
        const data = await fs.readFile(rutaTransacciones, "utf-8"); 
        return JSON.parse(data); 
    } catch (error) { 
        return []; 
    } 
};

// ==========================================
// RUTAS API
// ==========================================
// GET REPORTE (Lectura y cálculo matemático) 
const obtenerReporte = async (req, res) => { 
    try { 
        const transacciones = await leerTransacciones();
        // TODO: Acá va tu lógica matemática (reduce, filter, etc.)
        res.json({ transacciones });
    } catch (error) {
        res.status(500).json({ error: "Error al generar el reporte" });
    }
};

// ==========================================
// FUNCIONES PARA LAS VISTAS PUG
// ==========================================

// Función auxiliar para que no te dé ReferenceError
const generarReporte = async () => {
    const transacciones = await leerTransacciones();
    // TODO: Reemplazar estos valores fijos por los cálculos reales
    return { 
        volumen_total: 20000, 
        ganancia_plataforma: 1000, 
        tasa_error: 50 
    };
};

const obtenerEstadisticasVista = async (req, res) => { 
    try { 
        // Llama a la función auxiliar para obtener el objeto de datos
        const reporte = await generarReporte(); 
        res.render("estadisticas/reporte", { reporte }); 
    } catch (error) { 
        res.status(500).send("Error al cargar la vista de estadísticas"); 
    } 
}; 

// EXPORTACIÓN MODERNA (ES Modules)
export { 
    obtenerReporte,
    obtenerEstadisticasVista 
};