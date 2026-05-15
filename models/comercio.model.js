import mongoose from "mongoose";

const comercioSchema = new mongoose.Schema({
    // Nota: El campo "id" ya no es necesario declararlo, MongoDB genera un "_id" único y automático.
    nombre_comercio: { 
        type: String, 
        required: true 
    },
    cuit: { 
        type: String, 
        required: true 
    },
    email_contacto: { 
        type: String, 
        required: true 
    },
    plan_suscripcion: { 
        type: String, 
        required: true 
    },
    comision_variable: { 
        type: Number, 
        required: true 
    },
    estado: { 
        type: String, 
        default: "Activo" // Valor por defecto, tal como lo tenías en tu clase original
    }
}, {
    timestamps: true // Crea automáticamente createdAt y updatedAt
});

// Exportamos el modelo para usarlo en los controladores
export default mongoose.model("Comercio", comercioSchema);