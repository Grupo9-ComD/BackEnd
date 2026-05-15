import mongoose from "mongoose";

const transaccionSchema = new mongoose.Schema({
    // Guardará el _id alfanumérico de la Tienda donde se hizo la venta
    tienda_id: { 
        type: String, 
        required: true 
    },
    // Guardará el _id alfanumérico del Comercio dueño de la tienda
    comercio_id: { 
        type: String 
    },
    monto_total: { 
        type: Number, 
        required: true 
    },
    monto_informado_pasarela: { 
        type: Number, 
        required: true 
    },
    // Objeto anidado tal como lo tenías en tus pruebas de Thunder Client
    split_pagos: {
        comision_techretail: { type: Number, default: 0 },
        ingreso_comercio: { type: Number, default: 0 }
    },
    estado_conciliacion: { 
        type: String, 
        default: "Pendiente" 
    },
    observacion: { 
        type: String,
        default: ""
    }
}, {
    timestamps: true // Esto reemplazará tu antiguo campo "fecha" creando createdAt y updatedAt automáticamente
});

export default mongoose.model("Transaccion", transaccionSchema);