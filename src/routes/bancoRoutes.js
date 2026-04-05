const express = require("express");
const router = express.Router();
const {realizarDeposito, realizarRetiro, consultarHistorial, registrarCliente, borrarCliente} = require("../controllers/bancoController");

//rutas
router.post("/depositar", realizarDeposito);
router.post("/retirar", realizarRetiro);
router.get("/historial/:identificacion", consultarHistorial);
router.post("/registrar", registrarCliente);
router.delete("/eliminar/:identificacion", borrarCliente);


module.exports = router;

