const express = require("express");
const router = express.Router();
const {
  realizarDeposito,
  realizarRetiro,
  consultarHistorial,
  registrarCliente,
  borrarCliente,
  realizarTransferencia,
} = require("../controllers/bancoController");


router.post("/registrar", registrarCliente);
router.post("/depositar", realizarDeposito);
router.post("/retirar", realizarRetiro);
router.get("/historial/:identificacion", consultarHistorial);
router.delete("/eliminar/:identificacion", borrarCliente);
router.post("/transferencia", realizarTransferencia)

module.exports = router;
