require("dotenv").config();
const express = require("express");
const bancoRoutes = require("./src/routes/bancoRoutes");
const app = express();
const PORT = process.env.PORT || 8383;

app.use(express.json());

//
app.use((req, res, next) => {
  console.log(
    `${req.method} entrando a ${req.url} a la fecha y hora de: ${new Date().toLocaleString()}`,
  );
  next();
});

//ruta apis
app.use("/api", bancoRoutes);

app.use((err, req, res, next) =>{
    console.error("Ha ocurrido un problema...", err.message);
    res.status(500).json({
        status: "error",
        message: "Algo salió mal al contactar con el servidor",
        details: err.message
    });

});

app.listen(PORT, () => {
  console.log(`Servidor listo en el puerto ${PORT}`);
});
