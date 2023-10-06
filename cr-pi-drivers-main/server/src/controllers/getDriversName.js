const axios = require("axios");
apiUrl = "http://localhost:5000/drivers";
LIMIT = 15;
const { Driver } = require("../db");
const { Op } = require("sequelize");

const getDriverName = async (req, res) => {
  try {
    //solicito por query
    const { name } = req.query;

    const response = await axios.get(`${apiUrl}?limit=${LIMIT}`);
    const apiData = response.data;
    //hago un filter para filtrar por nombre la data recibida
    //!buscar simplificar esta linea
    const apiFiltered = apiData.filter((driver) => {
      const driverName = `${driver.name.forename} ${driver.name.surname}`;
      return driverName.toLowerCase().includes(name.toLowerCase());
    });
    
    if (apiFiltered.length > 0) {
      res.status(200).json(apiFiltered);
    } else {
        //consulta a la base de datos por nombre 
      const dbFiltered = await Driver.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // no discrimina entre mayusculas y minusculas
          },
        },
      });
      if (dbFiltered.length > 0) {
        res.status(200).json(dbFiltered);
      } else {
        res.status(400).json({ error: "Piloto no encontrado" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getDriverName;
