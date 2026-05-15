import mongoose from "mongoose";

const comercioSchema = new mongoose.Schema({
    nombre_comercio: { 
        type: String, 
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 120
    },
    cuit: { 
        type: String, 
        required: true,
        trim: true,
        validate: {
            validator: (value) => String(value ?? "").replace(/\D/g, "").length === 11,
            message: "cuit debe tener 11 dígitos"
        }
    },
    email_contacto: { 
        type: String, 
        required: true,
        trim: true,
        lowercase: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    plan_suscripcion: { 
        type: String, 
        required: true,
        trim: true,
        enum: ["Basico", "Básico", "Premium"]
    },
    comision_variable: { 
        type: Number, 
        required: true,
        min: 0,
        max: 1
    },
    estado: { 
        type: String, 
        default: "Activo",
        enum: ["Activo", "Inactivo"]
    }
}, {
    timestamps: true
});

export default mongoose.model("Comercio", comercioSchema);
