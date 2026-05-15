import express from "express";
import {
    obtenerTiendas,
    obtenerTiendaPorId,
    crearTienda,
    actualizarTienda,
    eliminarTienda,
    obtenerTiendasVista,
    obtenerTiendaVista,
    formularioNuevaTienda
} from "../controllers/tiendas.controller.js";

const router = express.Router();

// ==========================================
// RUTAS PARA LAS VISTAS PUG (Front-end)
// ==========================================
router.get("/vista", obtenerTiendasVista);
router.get("/nuevo", formularioNuevaTienda);
router.get("/vista/:id", obtenerTiendaVista);

// ==========================================
// RUTAS API REST (Endpoints para Thunder Client)
// ==========================================
router.get("/", obtenerTiendas);
router.get("/:id", obtenerTiendaPorId);
router.post("/", crearTienda);
router.put("/:id", actualizarTienda);
router.delete("/:id", eliminarTienda);

export default router;