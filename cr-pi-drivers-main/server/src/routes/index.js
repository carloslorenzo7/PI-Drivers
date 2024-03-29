const { Router } = require("express");
const getDrivers = require("../controllers/getDrivers");
const getDriversId= require ("../controllers/getDriversID")
const getDriversName= require ("../controllers/getDriversName")
const postDrivers= require ("../controllers/postDrivers.js")
const getTeams= require("../controllers/getTeams")
//const getDriverDb= require("../controllers/getDriversDb.js")
const router = Router();

router.get("/teams", getTeams)
router.post("/drivers", postDrivers)
router.get("/drivers/name", getDriversName)
router.get("/drivers/:id", getDriversId )
router.get("/drivers", getDrivers)
//router.get("/driverdb", getDriverDb )
module.exports = router;
