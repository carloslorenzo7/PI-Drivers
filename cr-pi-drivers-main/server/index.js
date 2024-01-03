
const server = require("./src/server");
const { conn } = require('./src/db.js');

// modificaciones para deploy del back 
require ('dotenv').config()
const {PORT} = process.env;



conn.sync({ force:false}).then(() => {
server.listen(PORT, () => {
  console.log('Server listening on port', process.env.PORT);
})
}).catch(error => console.error(error))
