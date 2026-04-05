const mongoose = require("mongoose");

const movimientoSchema = new mongoose.Schema({
  tipo: {
    type: String,
    enum: ["Ingreso", "Egreso"],
    required: true,
  },
  monto: {
    type: Number,
    required: true,
    min: [0.01, "El monto debe ser mayor a cero"],
  },
  fecha: { type: Date, default: Date.now },
  detalle: { type: String, trim: true },
});

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },

  identificacion: { // cedula 
    type: String,
    required: true,
    unique: true,
  },
  saldo: {
    type: Number,
    default: 0,
    min: [0, "El saldo no puede quedar en negativo"],
  },
  movimientos: [movimientoSchema],
});

module.exports = mongoose.model("Usuario", usuarioSchema);
