const axios = require("axios");
const {defaultImage} = require("../utils/defaultImage.js")


const getDrivers = async (req, res) => {
  try {
    
    const response = await axios.get("http://localhost:5000/drivers");
    driversData = response.data;

     // mapeo y assigno la funcion defaultImage a cada conductor que no tenga imagen 
    const driverWithImage = driversData.map(defaultImage);
      

        res.status(200).json(driverWithImage);
      }
    
    
    catch (error) {

      res.status(400).json({ error: error.message });
    };
  }
    

module.exports = getDrivers;
