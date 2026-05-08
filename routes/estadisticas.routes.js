import express from "express";
import { obtenerReporte } from "../controllers/estadisticas.controller.js";

const router = express.Router();

// GET a /estadisticas te devuelve el reporte automático
router.get("/", obtenerReporte);

export default router;