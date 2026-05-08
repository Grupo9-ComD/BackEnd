import express from "express";
// Importamos las funciones asíncronas con extensión .js
import {
    obtenerTransacciones,
    obtenerTransaccionPorId,
    crearTransaccion,
    actualizarTransaccion,
    eliminarTransaccion
} from "../controllers/transacciones.controller.js";

const router = express.Router();

// GET ALL
router.get("/", obtenerTransacciones);

// GET BY ID
router.get("/:id", obtenerTransaccionPorId);

// CREATE
router.post("/", crearTransaccion);

// UPDATE
router.put("/:id", actualizarTransaccion);

// DELETE
router.delete("/:id", eliminarTransaccion);

export default router;