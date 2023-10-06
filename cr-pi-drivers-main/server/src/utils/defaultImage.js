//? archivo para logica de imagen por default para los drivers que no tengan

imageUrl = "../images/cocheF1.jpg";
imageBy =
  "https://www.espn.com.ar/television/nota/_/id/8555552/formula-1-f-1-en-vivo-star-+-horarios-practicas-clasificacion-carrera-gran-premio-gp-transmision";

const defaultImage = (driver) => {
  if (!driver.image || !driver.image.url || !driver.image.imageby) {
    // Asigno una imagen por defecto al conductor si falta información de imagen
    driver.image = {
      url: imageUrl,
      imageby: imageBy,
    };
  }
  return driver;
};


module.exports = {defaultImage}