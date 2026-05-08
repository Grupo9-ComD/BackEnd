import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Estadísticas solo necesita leer las transacciones
const rutaTransacciones = path.join(__dirname, "../data/transacciones.json"); 

const leerTransacciones = async () => { 
    try {
        const data = await fs.readFile(rutaTransacciones, "utf-8"); 
        return JSON.parse(data);
    } catch (error) { 
        return []; 
    }
};

// GET REPORTE (Lectura y cálculo matemático)
const obtenerReporte = async (req, res) => { 
    try {
        const transacciones = await leerTransacciones();

        // 1. Ventas Totales
        const ventasTotales = transacciones.length;

        // 2. Volumen Movido (Suma de todos los montos totales)
        const volumenMovido = transacciones.reduce((acumulador, t) => acumulador + (t.monto_total || 0), 0);

        // 3. Ganancia de la Plataforma (Suma de todas las comisiones de TechRetail)
        const gananciaPlataforma = transacciones.reduce((acumulador, t) => {
            return acumulador + (t.split_pagos ? t.split_pagos.comision_techretail : 0);
        }, 0);

        // 4. Tasa de Error (Porcentaje de inconsistencias)
        const transaccionesConError = transacciones.filter(t => t.estado_conciliacion === "Inconsistencia Detectada").length;
        const tasaError = ventasTotales > 0 ? (transaccionesConError / ventasTotales) * 100 : 0;

        // 5. Estado del Sistema
        let estadoSistema = "Estable";
        if (tasaError > 0) {
            estadoSistema = "Alerta Crítica: Revisar Pasarela";
        }

        // Armamos el objeto final tal como se ve en la UI 
        const reporteHotSale = {
            evento: "Campaña Hot Sale - TechRetail Solutions",
            ventas_totales: ventasTotales,
            volumen_movido: volumenMovido,
            ganancia_plataforma: gananciaPlataforma,
            tasa_error: `${tasaError.toFixed(2)}%`,
            estado_sistema: estadoSistema
        };

        res.json(reporteHotSale);

    } catch (error) {
        res.status(500).json({ error: "Error interno al generar el reporte de estadísticas" });
    }
};

export { obtenerReporte };