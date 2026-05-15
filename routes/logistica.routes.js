import express from "express";
import {
    obtenerLogistica,
    obtenerOperacionPorId,
    crearOperacion,
    actualizarOperacion,
    eliminarOperacion,
    obtenerLogisticaVista,
    formularioNuevaLogistica
} from "../controllers/logistica.controller.js";

const router = express.Router();

// GET todas las operaciones de logística
router.get("/", obtenerLogistica)

router.get("/vista", obtenerLogisticaVista);

router.get("/nuevo", formularioNuevaLogistica);;

// GET una operación específica por ID
router.get("/:id", obtenerOperacionPorId);

// POST nueva operación de logística
router.post("/", crearOperacion);

// PUT modificar/actualizar una operación existente
router.put("/:id", actualizarOperacion);

// DELETE eliminar o dar de baja una operación
router.delete("/:id", eliminarOperacion);



export default router;