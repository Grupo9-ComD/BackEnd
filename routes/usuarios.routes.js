import express from "express";
// Importamos las funciones asíncronas con extensión .js
import {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuariosVista,
    formularioNuevoUsuario
} from "../controllers/usuarios.controller.js";

const router = express.Router();

// GET ALL
router.get("/", obtenerUsuarios);
router.get("/vista", obtenerUsuariosVista);

router.get("/nuevo", formularioNuevoUsuario);
// GET BY ID
router.get("/:id", obtenerUsuarioPorId);

// CREATE
router.post("/", crearUsuario);

// UPDATE
router.put("/:id", actualizarUsuario);

// DELETE (baja lógica)
router.delete("/:id", eliminarUsuario);


export default router;