require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const usersModel = require("../models/users.model");
const logger = require("../lib/logger");

const saltRounds = parseInt(process.env.SALT_ROUNDS);

const signUpValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    msg: error.msg,
    param: error.param,
    location: error.location,
  }),
});

const signup = (req, res, next) => {
  const errors = signUpValidationResult(req).array();

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {
      logger.error(err);
      next(err);
    } else {
      const property = {
        mail: req.body.mail,
        password: hash,
      };

      usersModel
        .checkMail(property.mail)
        .then((exists) => {
          if (exists) {
            res.status(404).json({
              message: "This mail already exists",
            });
          } else {
            usersModel
              .saveUser(property)
              .then(() => {
                res.status(200).json({
                  message: "User saved",
                });
              })
              .catch((err) => {
                logger.error(err);
              });
          }
        })
        .catch((err) => {
          logger.error(err);
          next(err);
        });
    }
  });
};

const signin = (req, res, next) => {
  usersModel.checkMail(req.body.mail).then((exists) => {
    if (exists) {
      usersModel.getPassword(req.body.mail).then((encryptedPassword) => {
        bcrypt.compare(req.body.password, encryptedPassword, (err, result) => {
          if (err) {
            logger.error(err);
            next(err);
          } else if (result === true) {
            usersModel.getId(req.body.mail).then((id) => {
              const payload = { mail: req.body.mail, id };
              const options = {
                expiresIn: process.env.TOKEN_EXPIRATION,
                issuer: process.env.TOKEN_ISSUER,
                audience: process.env.TOKEN_AUDIENCE,
              };
              const token = jwt.sign(payload, process.env.PRIVATE_KEY, options);

              mailService.sentMail(`${req.body.mail} has signed in`);

              res.status(200).json({
                message: "Login Successfull",
                token,
              });
            });
          } else {
            res.status(404).json({
              message: "Wrong password",
            });
          }
        });
      });
    } else {
      res.status(422).json({
        message:
          "Mail doesn't exist.Please use the signup route to create user first or enter correct mail",
      });
    }
  });
};

module.exports = { signup, signin };
