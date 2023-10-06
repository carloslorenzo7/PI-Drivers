const { Router } = require("express");
const getDrivers = require("../controllers/getDrivers");
const getDriversId= require ("../controllers/getDriversID")
const getDriversName= require ("../controllers/getDriversName")
const router = Router();

router.get("/drivers/name", getDriversName)
router.get("/drivers/:id", getDriversId )
router.get("/drivers", getDrivers)

module.exports = router;
