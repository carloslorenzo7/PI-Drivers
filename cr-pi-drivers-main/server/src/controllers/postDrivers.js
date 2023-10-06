const { Driver, Team } = require("../db");

const postDrivers = async (req, res) => {
  const { forename, surname, description, image, nationality, dob, teams } =
    req.body;
  try {
     // Divide la cadena de equipos en un array
     const teamNames = teams.split(",").map((teamName) => teamName.trim());

     // Crea un array para almacenar los equipos creados o encontrados
     const teamsToAssociate = [];
 
     // Recorre los nombres de los equipos
     for (const teamName of teamNames) {
       // Busca el equipo en la base de datos
       const existingTeam = await Team.findOne({
         where: { name: teamName },
       });
 
       // Si el equipo no existe, créalo y agrégalo al array
       if (!existingTeam) {
         const newTeam = await Team.create({ name: teamName });
         teamsToAssociate.push(newTeam);
       } else {
         teamsToAssociate.push(existingTeam);
       }
     }
    //creo el corredor en la base de datos
    const createDriver = await Driver.create({
      forename,
      surname,
      description,
      image,
      nationality,
      dob,
    });


    
        // Asocia los equipos al conductor
    await createDriver.addTeams(teamsToAssociate)
   
    // Agrega un console.log para verificar los equipos asociados correctamente.
    console.log("Equipos asociados al conductor:", teamsToAssociate);



    res.status(200).json(createDriver)
  } catch (error) {
    res.status(400).json({error:"Error al crear corredor"})
  }
};

module.exports = postDrivers;
