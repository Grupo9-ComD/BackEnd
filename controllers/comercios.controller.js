import fs from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";
import Comercio from "../models/comercio.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rutaArchivo = path.join(__dirname, "../data/comercios.json"); 

const leerComercios = async () => { 
    try {
        const data = await fs.readFile(rutaArchivo, "utf-8"); 
        return JSON.parse(data); 
    } catch (error) {
        return [];
    }
};

const guardarComercios = async (comercios) => { 
    await fs.writeFile(rutaArchivo, JSON.stringify(comercios, null, 2)); 
};

// GET ALL 
const obtenerComercios = async (req, res) => { 
    try {
        const comercios = await leerComercios(); 
        res.json(comercios); 
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los comercios" });
    }
};

// GET BY ID 
const obtenerComercioPorId = async (req, res) => { 
    try {
        const comercios = await leerComercios();
        const idBuscado = parseInt(req.params.id);
        const comercio = comercios.find(c => c.id === idBuscado);
        
        if (!comercio) {
            return res.status(404).json({ error: "Comercio no encontrado" });
        }
        res.json(comercio);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el comercio" });
    }
};

// CREATE 
const crearComercio = async (req, res) => {
    try {
        const comercios = await leerComercios();
        // ID autoincremental
        const nuevoId = comercios.length > 0 ? Math.max(...comercios.map(c => c.id)) + 1 : 1;
        
        // Usamos POO instanciando el modelo
        const nuevoComercio = new Comercio(
            nuevoId,
            req.body.nombre_comercio,
            req.body.cuit,
            req.body.email_contacto,
            req.body.plan_suscripcion,
            req.body.comision_variable,
            "Activo" // Estado por defecto
        );

        comercios.push(nuevoComercio);
        await guardarComercios(comercios);
        
        res.status(201).json({ mensaje: "Comercio creado con éxito", comercio: nuevoComercio });
    } catch (error) {
        res.status(500).json({ error: "Error al crear el comercio" });
    }
};

// UPDATE 
const actualizarComercio = async (req, res) => {
    try {
        const comercios = await leerComercios();
        const idBuscado = parseInt(req.params.id);
        const index = comercios.findIndex(c => c.id === idBuscado);

        if (index === -1) {
            return res.status(404).json({ error: "Comercio no encontrado para actualizar" });
        }

        // Actualizamos las propiedades
        comercios[index] = { ...comercios[index], ...req.body, id: idBuscado };
        await guardarComercios(comercios);

        res.json({ mensaje: "Comercio actualizado con éxito", comercio: comercios[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el comercio" });
    }
};

// DELETE (BAJA LOGICA) 
const eliminarComercio = async (req, res) => {
    try {
        const comercios = await leerComercios();
        const idBuscado = parseInt(req.params.id);
        const index = comercios.findIndex(c => c.id === idBuscado);

        if (index === -1) {
            return res.status(404).json({ error: "Comercio no encontrado para dar de baja" });
        }

        // Aplicamos la baja lógica cambiando el estado
        comercios[index].estado = "Inactivo";
        await guardarComercios(comercios);

        res.json({ mensaje: "Comercio dado de baja lógica exitosamente", comercio: comercios[index] });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el comercio" });
    }
};

// VISTAS FRONTEND
const obtenerComerciosVista = async (req, res) => { 
    try {
        const comercios = await leerComercios(); 
        res.render("comercios/list", { comercios }); 
    } catch (error) {
        res.status(500).send("Error al renderizar la vista de comercios");
    }
};

const obtenerComercioVista = async (req, res) => { 
    try {
        const comercios = await leerComercios();
        const idBuscado = parseInt(req.params.id);
        const comercio = comercios.find(c => c.id === idBuscado);
        if (!comercio) return res.status(404).send("Comercio no encontrado");
        
        res.render("comercios/detail", { comercio });
    } catch (error) {
        res.status(500).send("Error al renderizar la vista del comercio");
    }
};

const formularioNuevoComercio = (req, res) => { 
    res.render("comercios/form"); 
};

export { 
    obtenerComercios, obtenerComercioPorId, crearComercio, actualizarComercio, eliminarComercio, 
    obtenerComercioVista, obtenerComerciosVista, formularioNuevoComercio
};