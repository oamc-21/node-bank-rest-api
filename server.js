require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const {apiReference} = require('@scalar/express-api-reference')
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

//#region scalar 
/* app.use(
  "/docs",
  apiReference({
    theme: "purple", 
    spec: {
      content: {
        openapi: "3.1.0",
        info: {
          title: "restApi bancaria",
          version: "1.0.0",
          description: "Documentación de mi api rest usando scalar",
        },
        paths: {
          "/api/registrar": {
            post: {
              summary: "Registrar un nuevo cliente",
              responses: { 200: { description: "Usuario creado" } },
            },
          },
          "/api/depositar": {
            post: {
              summary: "Realizar un depósito",
              responses: { 200: { description: "Dinero depositado" } },
            },
          },

          "/api/retirar": {
            post: {
              summary: "Realizar un retiro",
              responses: { 200: { description: "Retiro efectuado" } },
            },
          },

          "/api/movimientos/{identificacion}": {
            get: {
              summary: "Obtener historial de movimientos de un cliente",
              responses: { 200: { description: "Historial de movimientos: " } },
            },
          },
          "/api/eliminar/{identificacion}": {
            delete: {
              summary: "Eliminar un cliente/registro",
              responses: {200: {description: "Se ha eliminado al cliente"}},
            }
          },
          "/api/transferencia/": {
            post:{
              summary: "Realizar una transferencia",
              responses: {200: {description: "Transferencia exitosa!"}}
            }
          },

          "/api/login/":{
            post:{
              summary: "Autenticacion / login cliente",
              responses: {200: {description: "Login exitoso!"}}
            }
          }
        },
      },
    },
  }),
); */

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
