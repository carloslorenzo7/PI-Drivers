const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
server.use(express.json());
// version original 
// server.use(cors());

// version para que ande el form 
server.use(cors({ origin: 'https://pi-drivers-gamma.vercel.app/' }));
server.use(router);

module.exports = server;
