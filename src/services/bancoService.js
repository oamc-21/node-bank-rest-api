const Usuario = require("../models/UsuarioModel");
const Transferencia = require("../models/TransferenciaModel");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
const agregarCliente = async (nombre, identificacion, password) => {
  const usuarioExistente = await Usuario.findOne({
    identificacion: identificacion,
  });
  if (usuarioExistente) {
    throw new Error("Ya existe un cliente con esa identificación");
  }
  const nuevoUsuario = new Usuario({
    nombre: nombre,
    identificacion: identificacion,
    password: password,
  });
  await nuevoUsuario.save();
  return nuevoUsuario;
};

//#endregion

const autenticarCliente = async (identificacion, password) => {
  const usuario = await Usuario.findOne({ identificacion });
  if (!usuario) throw new Error("Usuario no encontrado!");
  const esValido = await bcrypt.compare(password, usuario.password);
  if (!esValido) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    { id: usuario._id, identificacion: usuario.identificacion },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );
  return { usuario, token };
};

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

const transferir = async (idEmisor, idReceptor, monto, idempotencia_key) => {
  //Busqueda de usuarios para obtener sus id's reales _id.
  const emisorBD = await Usuario.findOne({ identificacion: idEmisor });
  const receptorBD = await Usuario.findOne({ identificacion: idReceptor });

  if (!emisorBD || !receptorBD) {
    throw new Error("No se ha encontrado uno o más usuarios en el sistema!");
  }

  const nuevaTransferencia = new Transferencia({
    idempotencia_key,
    tipo: "transferencia",
    emisor: emisorBD._id,
    receptor: receptorBD._id,
    monto,
    estado: "pendiente",
  });

  // Se guarda el testigo para idempotencia.
  await nuevaTransferencia.save();

  //Inicio la sesion de mongo para trabajar con el dinero
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const emisor = await Usuario.findOne({ identificacion: idEmisor }).session(
      session,
    );
    const receptor = await Usuario.findOne({
      identificacion: idReceptor,
    }).session(session);

    if (emisor.saldo < monto) throw new Error("Fondos insuficientes!");

    emisor.saldo -= monto;
    receptor.saldo += monto;

    await emisor.save({ session });
    await receptor.save({ session });

    await session.commitTransaction();
    nuevaTransferencia.estado = "completado";
  } catch (error) {
    await session.abortTransaction();
    nuevaTransferencia.estado = "fallido";
    console.error("Error en transferencia: ", error.message);
    throw error;
  } finally {
    session.endSession();
    await nuevaTransferencia.save();
  }
};

const obtenerMovimientos = async (usuarioId) => {
  return await Transferencia.find({
    $or: [{ emisor: usuarioId }, { receptor: usuarioId }],
  })
    .sort({ createdAt: -1 })
    .populate("emisor", "nombre")
    .populate("receptor", "nombre");
};

module.exports = {
  verHistorial,
  depositar,
  retirar,
  agregarCliente,
  eliminarCliente,
  transferir,
  obtenerMovimientos,
  autenticarCliente,
};
