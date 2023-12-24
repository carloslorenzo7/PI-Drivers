const axios = require("axios");
const { defaultImage } = require("../utils/defaultImage.js");
const { Driver, Team } = require("../db.js");
const { formatDataBD } = require("../utils/formatDataBD/formatDataBD.js");

const getDriversId = async (req, res) => {
  try {
    const { id } = req.params;

    let response;

    // si el numero es entero, buscaría en la api
    if (Number.isInteger(Number(id))) {
      response = await axios.get(`http://localhost:5000/drivers/${id}`);
    } else {
      // si el numero no es entero busca en la base de datos
      const dbDriver = await Driver.findByPk(id, {
        include: Team, // incluyo los datos del equipo asociado al conductor
      });

      if (dbDriver) {
        // Aplica la normalización a los datos obtenidos de la base de datos
        const normalizedDriver = formatDataBD([dbDriver]);

        
        res.status(200).json(normalizedDriver[0]); // Dado que formatDataBD devuelve un array, toma el primer elemento
        return;
      }
    }

    // si llegamos aquí, significa que es un número entero o el driver no se encontró en la base de datos
    const driversData = response?.data || {};
    const driverWithImage = defaultImage(driversData);
    
    res.status(200).json(driverWithImage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDriversId;