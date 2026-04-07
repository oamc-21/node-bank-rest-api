const mongoose = require('mongoose');
const transferenciaSchema = new mongoose.Schema({

  idempotencia_key: {
    type: String,
    unique: true,
    required: true
  },
  tipo: {
    type: String,
    enum: ["transferencia", "deposito", "retiro"],
    required: true
  },

  emisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: function(){return this.tipo !== 'deposito'},  
  },

  receptor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: function(){return this.tipo !== 'retiro'},
  },

  monto: {
    type: Number,
    required: true,
    min: [1, "El monto debe ser mayor a cero"],
  },
  estado: {
    type: String,
    enum: ["pendiente", "completado", "fallido"],
    default: "pendiente",
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transferencia", transferenciaSchema);