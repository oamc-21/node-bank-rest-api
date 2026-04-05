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
    const { identificacion, monto } = req.body;
    const montoNumerico = Number(monto);

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      return res
        .status(400)
        .json({ error: "Monto inválido, verifica por favor.." });
    }
    const resultado = await depositar(identificacion, montoNumerico);
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
    const { identificacion, monto } = req.body;
    const montoNumerico = Number(monto);
    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      return res
        .status(400)
        .json({ error: "Monto de retiro inválido, verifica por favor..." });
    }
    const resultado = await retirar(identificacion, montoNumerico);
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
    const { identificacion } = req.params;
    const datos = await verHistorial(identificacion);
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
      return res
        .status(400)
        .json({
          error: "El nombre no puede estar vacio o contener solo espacios",
        });
    }
    if (!identificacion || !identificacion.trim()) {
      return res
        .status(400)
        .json({ error: "La identificacion es obligatoria" });
    }
    const resultado = await agregarCliente(nombre, identificacion);
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
    const { identificacion } = req.params;
    if (!identificacion) {
      return res.status(400).json({
        error: "La identificación es obligatoria!",
      });
    }
    const resultado = await eliminarCliente(identificacion);
    res.status(200).json({
      mensaje: "El cliente ha sido eliminado exitosamente!",
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
