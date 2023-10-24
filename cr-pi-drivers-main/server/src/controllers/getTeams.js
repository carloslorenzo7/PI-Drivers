const axios = require("axios");
const {Team}= require("../db")

apiUrl = "http://localhost:5000/drivers";
const getTeams = async (req, res) => {
  try {
    const response = await axios.get(`${apiUrl}`);
    const dataApi = response.data;

    
     // Obtén los nombres de equipos de los datos del conductor y conviértelos en un arreglo
     const apiTeams = dataApi
     .filter((item) => item.teams) // Filtra los elementos que tienen la propiedad "teams" definida
     .map((item) => item.teams.split(",").map((team) => team.trim())) // Limpia los nombres de equipos
     

   // Filtra y elimina valores nulos, 'null' y duplicados
   const uniqueTeams = [...new Set(apiTeams.filter(team => team).flat())];

  // // Convierte el Set en un arreglo
  // const uniqueTeamsSet = [...uniqueTeams];

   // Almacena los nombres de equipos únicos en la base de datos
   await Team.bulkCreate(uniqueTeams.map((name) => ({ name: name })));
    res.status(200).json(uniqueTeams);


    
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = getTeams;


