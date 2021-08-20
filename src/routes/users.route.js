const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/users.controller");
const checkAuth = require("../middlewares/checkAuth.middleware");
const inputValidator = require("../middlewares/inputValidator.middleware");

router.post(
  "/signup",
  inputValidator.validate("createUser"),
  userControllers.signup
);
router.post("/signin", userControllers.signin);

module.exports = router;
