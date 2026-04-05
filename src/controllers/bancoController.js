const {
  depositar,
  retirar,
  verHistorial,
  agregarCliente,
  eliminarCliente,
} = require("../services/bancoService");

//#region realizar deposito ()
const realizarDeposito = async (req, res) => {
  try {
    const { nombre, monto } = req.body;
    const montoNumerico = Number(monto);

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      return res
        .status(400)
        .json({ error: "Monto inválido, verifica por favor.." });
    }
    const resultado = await depositar(nombre, montoNumerico);
    res.json({
      mensaje: "Se ha realizado el deposito exitosamente",
      nuevoSaldo: resultado,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//#endregion

//#region realizar retiro ()
const realizarRetiro = async (req, res) => {
  try {
    const { nombre, monto } = req.body;
    const montoNumerico = Number(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      return res
        .status(400)
        .json({ error: "Monto de retiro inválido, verifica por favor..." });
    }
    const resultado = await retirar(nombre, montoNumerico);
    res.json({
      mensaje: "Se ha retirado exitosamente el monto!",
      nuevoSaldo: resultado,
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
//#endregion

//#region ver Historial ()
const consultarHistorial = async (req, res) => {
  try {
    const nombreUsuario = req.params.nombre;
    const datos = await verHistorial(nombreUsuario);
    res.json(datos);
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};
//#endregion

//#region registrarCliente ()
const registrarCliente = async (req, res) => {
  try {
    const { nombre, identificacion } = req.body;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({
        error: "El nombre no puede estar vacio o contener solo espacios",
      });
    }
    const resultado = await agregarCliente(nombre);
    res.status(201).json({
      mensaje: "Se ha agregado el nuevo cliente!",
      cliente: resultado,
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
//#endregion

//#region borrar Cliente ()
const borrarCliente = async (req, res) => {
  try {
    const nombre = req.params.nombre;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({
        error: "El nombre no puede estar vacio o contener solo espacios",
      });
    }
    const resultado = await eliminarCliente(nombre);
    res.status(200).json({
      mensaje: "Registro borrado",
      cliente: resultado,
    });
  } catch (error) {
    res.status(400).json({
      mensaje: error.message,
    });
  }
};
//#endregion

module.exports = {
  realizarDeposito,
  realizarRetiro,
  consultarHistorial,
  registrarCliente,
  borrarCliente,
};

