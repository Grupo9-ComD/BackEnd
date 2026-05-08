import express from "express";

// Importamos todas las funciones del controlador usando la sintaxis moderna
import {
    obtenerComerciosVista,
    formularioNuevoComercio,
    obtenerComercioVista,
    obtenerComercios,
    obtenerComercioPorId,
    crearComercio,
    actualizarComercio,
    eliminarComercio
} from "../controllers/comercios.controller.js";

const router = express.Router();

// ---------- VISTAS PUG ----------
router.get("/vista", obtenerComerciosVista);
router.get("/nuevo", formularioNuevoComercio);
router.get("/vista/:id", obtenerComercioVista);

// ---------- API JSON ----------
router.get("/", obtenerComercios);
router.get("/:id", obtenerComercioPorId);
router.post("/", crearComercio);
router.put("/:id", actualizarComercio);
router.delete("/:id", eliminarComercio);

export default router;