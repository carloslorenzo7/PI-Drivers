const axios = require("axios");
const { defaultImage } = require("../utils/defaultImage.js");
const {formatDataBD} = require("../utils/formatDataBD/formatDataBD.js");
const { Driver, Team, TeamDriver } = require("../db");
const API_BASE_URL = process.env.API_BASE_URL;


const getDrivers = async (req, res) => {
  try {
    // busco drivers en la base de datos
    const driverDb = await Driver.findAll({
      where: { source: "database" },
      include: [
        {
          model: Team,
          through: TeamDriver,
        },
      ],
    });

    //busco drivers en la api
    const response = await axios.get(`${API_BASE_URL}/drivers`);
    driversApi = response.data;

    // mapeo y assigno la funcion defaultImage a cada conductor que no tenga imagen
    const driverWithImage = driversApi.map(defaultImage);

    const driversFormatedBD = formatDataBD(driverDb);

    const allDrivers = [...driversFormatedBD, ...driverWithImage];

    res.status(200).json(allDrivers);
  } catch (error) {
    console.error("Error en la ruta GET:", error);
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDrivers;
