
import conectarDB from "./config/db.js";

import express from "express";

const app = express();

// IMPORTACIÓN DE RUTAS (¡Ahora con ES Modules y extensión .js!)
import comerciosRoutes from "./routes/comercios.routes.js";
import tiendasRoutes from "./routes/tiendas.routes.js";
import transaccionesRoutes from "./routes/transacciones.routes.js";
import estadisticasRoutes from "./routes/estadisticas.routes.js";
import logisticaRoutes from "./routes/logistica.routes.js";
import usuariosRoutes from "./routes/usuarios.routes.js";

// MIDDLEWARES INCORPORADOS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MIDDLEWARE PERSONALIZADO 1: Request Logger
app.use((req, res, next) => {
    console.log(`[LOG] Petición recibida: ${req.method} a la ruta ${req.url}`);
    next(); // Fundamental para que pase a la ruta correspondiente
});

// CONFIGURACIÓN DE PUG
app.set("view engine", "pug");
app.set("views", "./views");

// RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.render("index");
});


conectarDB();

// RUTAS DEL SISTEMA
app.use("/comercios", comerciosRoutes);
app.use("/tiendas", tiendasRoutes);
app.use("/transacciones", transaccionesRoutes);
app.use("/estadisticas", estadisticasRoutes);
app.use("/logistica", logisticaRoutes);
app.use("/usuarios", usuariosRoutes);

// MIDDLEWARE PERSONALIZADO 2: Manejo de Error 404 sin rutas
// Si la petición del usuario no coincidió 
// con ninguna de las rutas de arriba, cae directamente acá.
app.use((req, res, next) => {
    res.status(404).json({ error: "Error 404: La ruta solicitada no existe en TechRetail Solutions" });
});

// PUERTO
const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});