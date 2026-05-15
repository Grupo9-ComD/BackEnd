import express from "express";
import {
    obtenerComercios,
    obtenerComercioPorId,
    crearComercio,
    actualizarComercio,
    eliminarComercio,
    obtenerComerciosVista,
    obtenerComercioVista,
    formularioNuevoComercio
} from "../controllers/comercios.controller.js";

const router = express.Router();

// ==========================================
// RUTAS PARA LAS VISTAS PUG (Front-end)
// ==========================================
router.get("/vista", obtenerComerciosVista);
router.get("/nuevo", formularioNuevoComercio);
router.get("/vista/:id", obtenerComercioVista);

// ==========================================
// RUTAS API REST (Endpoints para Thunder Client)
// ==========================================
router.get("/", obtenerComercios);
router.get("/:id", obtenerComercioPorId);
router.post("/", crearComercio);
router.put("/:id", actualizarComercio);
router.delete("/:id", eliminarComercio);

export default router;