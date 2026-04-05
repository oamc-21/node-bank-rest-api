require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bancoRoutes = require("./src/routes/bancoRoutes");
const app = express();
const PORT = process.env.PORT || 8383;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a la BD"))
  .catch((err) => console.error("Error de conexion mongodb", err));

app.use(express.json());

//#region  middleware
app.use((req, res, next) => {
  console.log(
    `${req.method} entrando a ${req.url} a la fecha y hora de: ${new Date().toLocaleString()}`,
  );
  next();
});

//#endregion

//#region rutas
app.use("/api", bancoRoutes);

app.use((err, req, res, next) => {
  console.error("Ha ocurrido un problema...", err.message);
  res.status(500).json({
    status: "error",
    message: "Algo salió mal al contactar con el servidor",
    details: err.message,
  });
});

//#endregion

app.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${PORT}`);
});
