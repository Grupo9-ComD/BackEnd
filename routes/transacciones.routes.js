import express from "express";
// Importamos las funciones asíncronas con extensión .js
import {
    obtenerTransacciones,
    obtenerTransaccionPorId,
    crearTransaccion,
    actualizarTransaccion,
    eliminarTransaccion,
    obtenerTransaccionesVista,
    formularioNuevaTransaccion
} from "../controllers/transacciones.controller.js";

const router = express.Router();

// GET ALL
router.get("/", obtenerTransacciones);

router.get("/vista", obtenerTransaccionesVista);

router.get("/nuevo", formularioNuevaTransaccion);
// GET BY ID
router.get("/:id", obtenerTransaccionPorId);

// CREATE
router.post("/", crearTransaccion);

// UPDATE
router.put("/:id", actualizarTransaccion);

// DELETE
router.delete("/:id", eliminarTransaccion);



export default router;