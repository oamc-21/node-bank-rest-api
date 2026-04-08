const express = require("express");
const router = express.Router();
const {
  realizarDeposito,
  realizarRetiro,
  consultarHistorial,
  registrarCliente,
  borrarCliente,
  realizarTransferencia,
  obtenerHMovimientos,
  loginCliente,
} = require("../controllers/bancoController");
const { verificarToken } = require("../middlewares/authMiddleware");

console.log({registrarCliente, realizarDeposito, verificarToken});
router.post("/registrar", registrarCliente);
router.post("/depositar", realizarDeposito);
router.post("/retirar", verificarToken, realizarRetiro);
//router.get("/historial/:identificacion", consultarHistorial);
router.delete("/eliminar/:identificacion", borrarCliente);
router.post("/transferencia",verificarToken,  realizarTransferencia);
router.get("/movimientos/", verificarToken, obtenerHMovimientos);
router.post("/login", loginCliente);

module.exports = router;
