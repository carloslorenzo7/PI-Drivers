const { Driver, Team } = require("../db");

const postDrivers = async (req, res) => {
  console.log("Datos recibidos:", req.body);
  const { forename,surname , description, image, nationality, dob, teams } =
    req.body;

  try {
    // const forename = name.forename;
    //   const surname = name.surname;

      const teamNames = typeof teams === 'string' ? teams.split(",") : teams;

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
    // Extrae la URL de la imagen
    const imageUrl = image

    //creo el corredor en la base de datos
    const createDriver = await Driver.create({
      
        forename,
        surname,
      
      nationality,
      dob,
      image: imageUrl,
      description,
      source: "database"
    });
    console.log("Driver creado:", createDriver);
    // Asocia los equipos al conductor
    await createDriver.addTeams(teamsToAssociate);
// Estructura la respuesta para que sea similar a la API consumida
    const response = {
      id: createDriver.id,
      name: {
        forename,
        surname,
      },
      description,
      image: {
        url: imageUrl,
      },
      dob,
      nationality,
      teams: teamNames.join(', ')
    };
    
    res.status(200).json(response);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(400).json({ error: "Error al crear corredor",details: error.message  });
  }
};

module.exports = postDrivers;
