import mongoose from "mongoose";

const logisticaSchema = new mongoose.Schema({
    // Guardará el _id alfanumérico de la Transacción asociada
    transaccion_id: { 
        type: String, 
        required: true 
    },
    empresa_transporte: { 
        type: String, 
        required: true 
    },
    direccion_destino: { 
        type: String, 
        required: true 
    },
    estado_envio: {  // <-- Respetamos tu nombre original
        type: String, 
        default: "En preparación" 
    }
}, {
    timestamps: true // Agrega automáticamente createdAt y updatedAt
});

export default mongoose.model("Logistica", logisticaSchema);