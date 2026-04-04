const fs = require("fs").promises;
const db_location = "src/models/base_de_datos.json";
const obtenerDatos = async () => {
  try {
    const dataObj = await fs.readFile(db_location, "utf-8");
    return JSON.parse(dataObj);
  } catch (error) {
    console.error(error);
    return { titular: "Invitado", saldo: 0, movimientos: [] };
  }
};

const guardarDatos = async (obj) => {
  try {
    const dataObj = JSON.stringify(obj, null, 2);
    await fs.writeFile(db_location, dataObj);
    console.log("Datos guardados exitosamente!");
  } catch (error) {
    console.error("Se ha producido un error al guardar los datos", error);
  }
};

module.exports = {
  guardarDatos,
  obtenerDatos,
};
