const Usuario = require("../models/UsuarioModel");
const {
  depositar,
  retirar,
  verHistorial,
  agregarCliente,
  eliminarCliente,
  transferir,
  obtenerMovimientos,
  autenticarCliente
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
    const {identificacion } = req.usuario
    const {monto}  = req.body;
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
    const { nombre, identificacion, password} = req.body;
    if (!nombre || !nombre.trim()) {
      return res.status(400).json({
        error: "El nombre no puede estar vacio o contener solo espacios",
      });
    }
    if (!identificacion || !identificacion.trim()) {
      return res
        .status(400)
        .json({ error: "La identificacion es obligatoria" });
    }

    if(!password || !password.trim()){
      return res.status(400).json({error: "La contraseña es obligatoria"});
    }
    const resultado = await agregarCliente(nombre, identificacion, password);
    res.status(201).json({
      mensaje: "Se ha agregado el nuevo cliente!",
      cliente: resultado,
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};
//#endregion

const loginCliente = async(req, res) =>{
  try {
    const {identificacion, password} = req.body
     if (!identificacion || !password) {
       return res
         .status(400)
         .json({ mensaje: "Identificacion y password requeridos" });
     }
     const {usuario, token} = await autenticarCliente(identificacion, password);
     res.status(200).json({
      mensaje: "Login exitoso",
      token, 
      usuario:{
        nombre: usuario.nombre,
        identificacion: usuario.identificacion
      }
     })
  } catch (error) {
    res.status(401).json({mensaje: error.message});
  }
}


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


//#region realizar Transferencia
const realizarTransferencia = async (req, res) => {
  try {
    const idEmisor  = req.usuario.identificacion;
    const { idReceptor, monto, idempotencia_key } = req.body;
    if (!idEmisor || !idReceptor || !monto || !idempotencia_key) {
      return res.status(400).json({
        error: "La cuenta origen y destino son obligatoriasl.",
      })
      };
      await transferir(idEmisor,idReceptor,monto,idempotencia_key);
      res.status(200).json({mensaje: "Transferencia exitosa!",});
    
  }catch (error) {
    res.status(400).json({ mensaje: error.message });
  };
};

//#endregion

const obtenerHMovimientos = async(req, res)=>{

  try {
    const { identificacion } = req.usuario;
    const usuario = await Usuario.findOne({ identificacion: identificacion });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Usuario no encontrado!" });
    }

    const resultado = await obtenerMovimientos(usuario._id);
    res.status(200).json({
      cliente: usuario.nombre,
      saldoActual: usuario.saldo,
      movimientos: resultado,
    });
  } catch (error) {
    res.status(500).json({mensaje: "Error al obtener el historial de movimientos", error: error.message});
  }
  

};
module.exports = {
  realizarDeposito,
  realizarRetiro,
  consultarHistorial,
  registrarCliente,
  borrarCliente,
  realizarTransferencia,
  obtenerHMovimientos,
  loginCliente,
}
