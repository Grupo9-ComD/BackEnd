import express from "express";
import {
    obtenerEnvios,
    obtenerEnvioPorId,
    crearEnvio,
    actualizarEnvio,
    eliminarEnvio,
    obtenerEnviosVista,
    obtenerEnvioVista,
    formularioNuevoEnvio
} from "../controllers/logistica.controller.js";

const router = express.Router();

// ==========================================
// RUTAS PARA LAS VISTAS PUG (Front-end)
// ==========================================
router.get("/vista", obtenerEnviosVista);
router.get("/nuevo", formularioNuevoEnvio);
router.get("/vista/:id", obtenerEnvioVista);

// ==========================================
// RUTAS API REST (Endpoints para Thunder Client)
// ==========================================
router.get("/", obtenerEnvios);
router.get("/:id", obtenerEnvioPorId);
router.post("/", crearEnvio);
router.put("/:id", actualizarEnvio);
router.delete("/:id", eliminarEnvio);

export default router;