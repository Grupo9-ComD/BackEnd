import express from "express";
import {
    obtenerTransacciones,
    obtenerTransaccionPorId,
    crearTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    obtenerTransaccionesVista,
    obtenerTransaccionVista,
    formularioNuevaTransaccion
} from "../controllers/transacciones.controller.js";

const router = express.Router();

// ==========================================
// RUTAS PARA LAS VISTAS PUG (Front-end)
// ==========================================
router.get("/vista", obtenerTransaccionesVista);
router.get("/nuevo", formularioNuevaTransaccion);
router.get("/vista/:id", obtenerTransaccionVista);

// ==========================================
// RUTAS API REST (Endpoints para Thunder Client)
// ==========================================
router.get("/", obtenerTransacciones);
router.get("/:id", obtenerTransaccionPorId);
router.post("/", crearTransaccion);
router.put("/:id", actualizarTransaccion);
router.delete("/:id", eliminarTransaccion);

export default router;