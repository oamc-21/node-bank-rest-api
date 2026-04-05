const usuario = require("../models/usuario");
const Usuario = require("../models/usuario");

//#region () depositar
const depositar = async (identificacion, monto) => {
  const usuarioExistente = await Usuario.findOne({identificacion});
  if(!usuarioExistente){
    throw new Error("Usuario no existe!");
  }
  usuarioExistente.saldo += monto;
  usuarioExistente.movimientos.push({
    tipo: "Ingreso",
    monto: monto,
    detalle: "Deposito de efectivo"
  });
  await usuarioExistente.save();
  return usuario.saldo;
};
//#endregion

//#region () retirar
const retirar = async (nombre, monto) => {
  const cuenta = await obtenerDatos();
  const usuario = cuenta.find((u) => u.titular === nombre);
  if (!usuario) {
    throw new Error("Usuario no existe!");
  }
  if (typeof monto != "number" || monto <= 0) {
    throw new Error("El monto ingresado no es válido!");
  }
  if (monto > usuario.saldo) {
    throw new Error("Saldo insuficiente");
  }
  usuario.saldo -= monto;
  usuario.movimientos.push({
    tipo: "retiro",
    monto: monto,
    fecha: new Date().toISOString,
    detalle: "Retiro de efectivo",
  });
  await guardarDatos(cuenta);
  return usuario.saldo;
};
//#endregion

//#region () ver historial
const verHistorial = async (nombre) => {
  const cuenta = await obtenerDatos();
  const user = cuenta.find((u) => u.titular === nombre);

  if (!user) {
    throw new Error("Usuario no encontrado..");
  }

  return user.movimientos;
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
const eliminarCliente = async (nombre) => {
  const datos = await obtenerDatos();
  const datosFiltrados = datos.filter(
    (u) => u.titular.toLowerCase() !== nombre.toLowerCase(),
  );
  if (datos.length === datosFiltrados.length) {
    throw new Error("El usuario no ha podido ser eliminado..");
  }
  await guardarDatos(datosFiltrados);
  return { mensaje: `El cliente ${nombre} ha sido eliminado correctamente!` };
};

//#endregion

module.exports = {
  verHistorial,
  depositar,
  retirar,
  agregarCliente,
  eliminarCliente,
};
