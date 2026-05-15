import mongoose from "mongoose";

const tiendaSchema = new mongoose.Schema({
    nombre_sucursal: { 
        type: String, 
        required: true 
    },
    // Atención acá: a partir de ahora este campo guardará el "_id" alfanumérico que genera Mongo para los comercios
    comercio_id: { 
        type: String, 
        required: true 
    },
    ubicacion: { 
        type: String, 
        required: true 
    },
    estado: { 
        type: String, 
        default: "Activo" // Mantenemos la lógica para la baja lógica
    }
}, {
    timestamps: true // Para que Mongoose agregue automáticamente createdAt y updatedAt
});

export default mongoose.model("Tienda", tiendaSchema);