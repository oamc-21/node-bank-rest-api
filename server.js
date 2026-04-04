const { verHistorial, depositar, retirar } = require("./src/services/bancoService");
const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.json());

const bancoRoutes = require("./src/routes/bancoRoutes");
app.use("/api", bancoRoutes);

app.get("/", (res) => {
  res.send("Hola desde el server del banco");
});

app.listen(PORT, () => {
  console.log("Servidor listo");
});
