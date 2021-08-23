const express = require('express');
const userControllers = require('../controllers/users.controller');
const inputValidator = require('../middlewares/inputValidator.middleware');

const router = express.Router();

router.post(
  '/signup',
  inputValidator.validate('createUser'),
  inputValidator.result('signUpValidationsult'),
  userControllers.signup
);
router.post('/signin', userControllers.signin);

module.exports = router;
