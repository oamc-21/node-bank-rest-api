const { obtenerDatos, guardarDatos } = require("../models/database");

//#region () depositar
const depositar = async (nombre, monto) => {
  const cuenta = await obtenerDatos();
  const usuario = cuenta.find((u) => u.titular === nombre);
  if (typeof monto != "number" || monto <= 0) {
    throw new Error("El monto es inválido");
  }
  if (!usuario) {
    throw new Error("Usuario no existe!");
  }
  usuario.saldo += monto;
  usuario.movimientos.push(
    `Deposito de efectivo monto: ${monto} a la fecha de: ${new Date().toLocaleString()}`,
  );
  await guardarDatos(cuenta);
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
  usuario.movimientos.push(
    `Retiro de efectivo monto: ${monto} a la fecha de: ${new Date().toLocaleString()}`,
  );
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
const agregarCliente = async (nombre) => {
  const datos = await obtenerDatos();
  const buscarUsuario = datos.find(
    (u) => u.titular.toLowerCase() === nombre.toLowerCase(),
  );
  if (buscarUsuario) {
    throw new Error("Usuario ya existe!");
  }
  const nuevoCliente = { titular: nombre, saldo: 0, movimientos: [] };
  datos.push(nuevoCliente);
  await guardarDatos(datos);
  return nuevoCliente;
};

//#endregion

//#region () Eliminar cliente
const eliminarCliente = async (nombre) =>{
  const datos = await obtenerDatos();
  const datosFiltrados = datos.filter((u) => u.titular.toLowerCase() !== nombre.toLowerCase());
  if (datos.length === datosFiltrados.length) {
    throw new Error("El usuario no ha podido ser eliminado..");
    
  }
  await guardarDatos(datosFiltrados);
  return {mensaje: `El cliente ${nombre} ha sido eliminado correctamente!`}
}

//#endregion

module.exports = {
  verHistorial,
  depositar,
  retirar,
  agregarCliente,
  eliminarCliente,
};
