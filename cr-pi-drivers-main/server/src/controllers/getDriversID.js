const axios = require("axios");
const { defaultImage } = require("../utils/defaultImage.js");
const { Driver, Team } = require("../db.js");

const getDriversId = async (req, res) => {
  try {
    // Obtengo el valor del ID desde los parámetros de la ruta
    const { id } = req.params;
    // si el numero es entero, buscaria en la api
    if (Number.isInteger(Number(id))) {
      const response = await axios.get(`http://localhost:5000/drivers/${id}`);

      const driversData = response.data;

      // Asignar una imagen por defecto al conductor obtenido por ID si no la tiene
      const driverWithImage = defaultImage(driversData);


     

      return res.status(200).json(driverWithImage);
    } else {
      // si el numero no es entero busca en la base de datos
      const dbDriver = await Driver.findByPk(id, {
        include: Team, // incluyo los datos del equipo asociado al conductor
      });

      if (dbDriver) {
        const driverDetail = {
          id: dbDriver.id,
          forename: dbDriver.forename,
          surname: dbDriver.surname,
          description: dbDriver.description,
          image: dbDriver.image,
          nationality: dbDriver.nationality,
          dob: dbDriver.dob,
          team: dbDriver.Team, // Incluyo los datos del equipo en la respuesta
        };
        res.status(200).json(driverDetail);
      } else {
        res.status(400).json({ error: "Driver no encontrado" });
      }
    }
  } catch (error) {
    
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDriversId;
