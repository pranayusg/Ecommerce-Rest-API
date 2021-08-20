const express = require("express");
const checkAuth = require("../middlewares/checkAuth.middleware");
const covidControllers = require("../controllers/covid.controller");

const router = express.Router();

router.all("*", checkAuth);

router.get("/country/name", covidControllers.countryInQuery);
router.get("/country/name/:name", covidControllers.countryInPath);

module.exports = router;
