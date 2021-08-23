const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersModel = require('../models/users.model');
const logger = require('../lib/logger');
const mailService = require('../services/mail.service');

const signup = (req, res, next) => {
  // const errors = signUpValidationResult(req).array();

  // if (errors.length > 0) {
  //   return res.status(400).json({ errors });
  // }

  bcrypt.hash(
    req.body.password,
    parseInt(process.env.SALT_ROUNDS, 10),
    (error, hash) => {
      if (error) {
        logger.error(error);
        next(error);
      } else {
        res.locals.property = {
          mail: req.body.mail,
          password: hash,
        };

        usersModel
          .checkMail(res.locals.property.mail)
          .then((exists) => {
            if (exists) {
              res.status(404).json({
                message: 'This mail already exists',
              });
            } else {
              usersModel
                .saveUser(res.locals.property)
                .then(() => {
                  res.status(201).json({
                    message: 'User saved',
                  });
                })
                .catch((err) => {
                  logger.error(err);
                  res.status(500).json({
                    message: 'Unable to save User',
                  });
                });
            }
          })
          .catch((err) => {
            logger.error(err);
            res.status(500).json({
              message: 'Something went wrong while Checking mail in DB',
              error: err,
            });
          });
      }
    }
  );
};

const signin = (req, res, next) => {
  usersModel.checkMail(req.body.mail).then((exists) => {
    if (exists) {
      usersModel
        .getPassword(req.body.mail)
        .then((encryptedPassword) => {
          bcrypt.compare(
            req.body.password,
            encryptedPassword,
            (err, result) => {
              if (err) {
                logger.error(err);
                next(err);
              } else if (result === true) {
                usersModel.getId(req.body.mail).then((id) => {
                  res.locals.payload = { mail: req.body.mail, id };
                  res.locals.options = {
                    expiresIn: process.env.TOKEN_EXPIRATION,
                    issuer: process.env.TOKEN_ISSUER,
                    audience: process.env.TOKEN_AUDIENCE,
                  };
                  res.locals.token = jwt.sign(
                    res.locals.payload,
                    process.env.PRIVATE_KEY,
                    res.locals.options
                  );

                  // mailService.sentMail(`${req.body.mail} has signed in`);

                  res.status(200).json({
                    message: 'Login Successfull',
                    token: res.locals.token,
                  });
                });
              } else {
                res.status(404).json({
                  message: 'Wrong password',
                });
              }
            }
          );
        })
        .catch((err) => {
          logger.error(err);
          res.status(500).json({
            message: 'Unable to retrieve password',
          });
        });
    } else {
      res.status(422).json({
        message: "Mail doesn't exist",
      });
    }
  });
};

module.exports = { signup, signin };
