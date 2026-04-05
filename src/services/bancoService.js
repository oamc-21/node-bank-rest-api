const Usuario = require("../models/usuario");

//#region () depositar
const depositar = async (identificacion, monto) => {
  const usuarioExistente = await Usuario.findOne({ identificacion });
  if (!usuarioExistente) {
    throw new Error("Usuario no existe!");
  }
  usuarioExistente.saldo += monto;
  usuarioExistente.movimientos.push({
    tipo: "Ingreso",
    monto: monto,
    detalle: "Deposito de efectivo",
  });
  await usuarioExistente.save();
  return usuarioExistente.saldo;
};
//#endregion

//#region () retirar
const retirar = async (identificacion, monto) => {
  const usuarioExistente = await Usuario.findOne({
    identificacion: identificacion,
  });
  if (!usuarioExistente) {
    throw new Error("El usuario no existe!");
  }

  if (usuarioExistente.saldo < monto) {
    throw new Error("Fondos insuficientes para realizar la operación");
  }
  usuarioExistente.saldo -= monto;
  usuarioExistente.movimientos.push({
    tipo: "Egreso",
    monto: monto,
    detalle: "Retiro de efectivo",
  });
  await usuarioExistente.save();
  return usuarioExistente.saldo;
};
//#endregion

//#region () ver historial
const verHistorial = async (identificacion) => {
  const usuarioExistente = await Usuario.findOne({
    identificacion: identificacion,
  });
  if (!usuarioExistente) {
    throw new Error("Usuario no existe!");
  }
  return usuarioExistente.movimientos;
};

//#endregion

//#region () agregar cliente
const agregarCliente = async (nombre, identificacion) => {
  const usuarioExistente = await Usuario.findOne({
    identificacion: identificacion,
  });
  if (usuarioExistente) {
    throw new Error("Ya existe un cliente con esa identificación");
  }
  const nuevoUsuario = new Usuario({
    nombre: nombre,
    identificacion: identificacion,
  });
  await nuevoUsuario.save();
  return nuevoUsuario;
};

//#endregion

//#region () Eliminar cliente
const eliminarCliente = async (identificacion) => {
  const usuarioBorrado = await Usuario.findOneAndDelete({
    identificacion: identificacion,
  });
  if (!usuarioBorrado) {
    throw new Error("Usuario no encontrado!");
  }
  return usuarioBorrado;
};

//#endregion

module.exports = {
  verHistorial,
  depositar,
  retirar,
  agregarCliente,
  eliminarCliente,
};
