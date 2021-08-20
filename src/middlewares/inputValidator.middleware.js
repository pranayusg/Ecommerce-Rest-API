const { body } = require('express-validator');
const logger = require('../lib/logger');

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('mail', 'Invalid email').isEmail(),
        body('password', 'Password must be minimum 3 characters').isLength({
          min: 3,
        }),
      ];
    }
    default: {
      logger.error('Didnt match any case in input validator');
    }
  }
};
