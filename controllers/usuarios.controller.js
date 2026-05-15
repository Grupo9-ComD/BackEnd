import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";
import Usuario from "../models/usuario.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaArchivo = path.join(__dirname, "../data/usuarios.json"); 

const leerUsuarios = async () => { 
    try {
        const data = await fs.readFile(rutaArchivo, "utf-8"); 
        return JSON.parse(data); 
    } catch (error) {
        return []; 
    }
};

const guardarUsuarios = async (usuarios) => { 
    await fs.writeFile(rutaArchivo, JSON.stringify(usuarios, null, 2)); 
};

// GET ALL 
const obtenerUsuarios = async (req, res) => { 
    try {
        const usuarios = await leerUsuarios();
        res.json(usuarios); 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};

// GET BY ID 
const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuarios = await leerUsuarios();
        const idBuscado = parseInt(req.params.id);
        const usuario = usuarios.find(u => u.id === idBuscado);
        
        if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};

// CREATE 
const crearUsuario = async (req, res) => {
    try {
        const usuarios = await leerUsuarios();
        const nuevoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;
        
        // POO al instanciar
        const nuevoUsuario = new Usuario(
            nuevoId,
            req.body.nombre_empleado,
            req.body.email_corporativo,
            "Activo" // Estado por defecto
        );

        usuarios.push(nuevoUsuario);
        await guardarUsuarios(usuarios);
        
        res.status(201).json({ mensaje: "Usuario creado exitosamente", usuario: nuevoUsuario });
    } catch (error) {
         res.status(500).json({ error: "Error interno al crear usuario" });
    }
};

// UPDATE 
const actualizarUsuario = async (req, res) => {
    try {
        const usuarios = await leerUsuarios();
        const idBuscado = parseInt(req.params.id);
        const index = usuarios.findIndex(u => u.id === idBuscado);

        if (index === -1) return res.status(404).json({ error: "Usuario no encontrado para actualizar" });

        usuarios[index] = { ...usuarios[index], ...req.body, id: idBuscado };
        await guardarUsuarios(usuarios);

        res.json({ mensaje: "Usuario actualizado", usuario: usuarios[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar usuario" });
    }
};

// DELETE (Baja lógica)
const eliminarUsuario = async (req, res) => {
    try {
        const usuarios = await leerUsuarios();
        const idBuscado = parseInt(req.params.id);
        const index = usuarios.findIndex(u => u.id === idBuscado);

        if (index === -1) return res.status(404).json({ error: "Usuario no encontrado para dar de baja" });

        usuarios[index].estado = "Inactivo"; // Baja lógica
        await guardarUsuarios(usuarios);

        res.json({ mensaje: "Usuario dado de baja lógicamente", usuario: usuarios[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar usuario" });
    }
};

const obtenerUsuariosVista = async (req, res) => {
    try {
        const usuarios = await leerUsuarios();
        res.render("usuarios/list", { usuarios });
    } catch (error) { res.status(500).send("Error"); }
};
const formularioNuevoUsuario = async (req, res) => {
    try { res.render("usuarios/form"); } 
    catch (error) { res.status(500).send("Error"); }
};

export { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario, obtenerUsuariosVista,formularioNuevoUsuario };