const express = require("express");
const router = express.Router();
const {realizarDeposito, realizarRetiro, consultarHistorial, registrarCliente, borrarCliente} = require("../controllers/bancoController");

//rutas
router.post("/depositar", realizarDeposito);
router.post("/retirar", realizarRetiro);
router.get("/historial/:nombre", consultarHistorial);
router.post("/registrar", registrarCliente);
router.delete("/eliminar/:nombre", borrarCliente);

module.exports = router;