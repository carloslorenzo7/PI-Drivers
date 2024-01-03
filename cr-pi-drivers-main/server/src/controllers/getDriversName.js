const axios = require("axios");

LIMIT = 15;
const { Driver, Team } = require("../db");
const { Op } = require("sequelize");
const { defaultImage } = require("../utils/defaultImage.js");

const API_BASE_URL = process.env.API_BASE_URL; 

const getDriverName = async (req, res) => {
  try {
    //solicito por query
    const { name } = req.query;
    // hago solicitud a la api
    const response = await axios.get(`${API_BASE_URL}/drivers`);
    const apiData = response.data;
  

    
    //filtro para hacer busqueda insensible de mayuscula o minuscula y que me mande los posibles nombres que tengas las iniciales brindadas
    const apiFilter= apiData.filter((driver)=> //driver.name.forename.toLowerCase().startsWith(name.toLowerCase()) version si quiero como tenia antes descomentar linea  
    {
      
      
       const forenameMatch= driver.name.forename.toLowerCase().startsWith(name.toLowerCase())
       const surnameMatch = driver.name.surname.toLowerCase().startsWith(name.toLowerCase());
        return forenameMatch || surnameMatch;
      
      })
   
   
  const limitApi=apiFilter.slice(0,15).map((driver)=>({
    // cambie estructura a como llega en la api 
    id: driver.id,
    name: {
      forename: driver.name.forename,
      surname: driver.name.surname,
    },
    description: driver.description,
    nationality: driver.nationality,
    dob: driver.dob,
    image: {
      url: driver.image.url, 
    },
    teams: driver.teams,
  }));
console.log("limitApi:", limitApi);



    if (limitApi.length > 0) {
      res.status(200).json(limitApi);
    } else {
        //consulta a la base de datos por nombre 
      const dbFiltered = await Driver.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // no discrimina entre mayusculas y minusculas
          },
        },
        limit:15,
        include:{model:Team},attributes: ["name"]
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