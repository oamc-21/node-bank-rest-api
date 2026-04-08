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
  password:{
    type: String,
    required: true
  },

  movimientos: [movimientoSchema],
});
const bcrypt = require('bcryptjs');
usuarioSchema.pre('save', async function () { // <--- Sin el "next"
  if (!this.isModified('password')) return; // <--- Solo return, sin llamar a nada
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  // Al ser async, Mongoose sabe que cuando termine esta función, puede seguir.
});
  

module.exports = mongoose.model("Usuario", usuarioSchema);
