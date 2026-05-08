import express from "express";
import {
    obtenerTiendas,
    obtenerTiendaPorId,
    crearTienda,
    actualizarTienda,
    eliminarTienda
} from "../controllers/tiendas.controller.js";

const router = express.Router();

// GET ALL
router.get("/", obtenerTiendas);

// GET BY ID
router.get("/:id", obtenerTiendaPorId);

// CREATE
router.post("/", crearTienda);

// UPDATE
router.put("/:id", actualizarTienda);

// DELETE (baja lógica)
router.delete("/:id", eliminarTienda);

export default router;