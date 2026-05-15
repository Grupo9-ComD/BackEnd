import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    rol: { 
        type: String, 
        required: true 
    },
    estado: { 
        type: String, 
        default: "Activo" 
    }
}, {
    timestamps: true // Genera createdAt y updatedAt automáticamente
});

export default mongoose.model("Usuario", usuarioSchema);