const { body, validationResult } = require('express-validator');
const logger = require('../lib/logger');

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('mail', 'Invalid email').trim().exists().isEmail(),
        body('password', 'Password must be minimum 3 characters').isLength({
          min: 3,
        }),
      ];
    }
    case 'createProduct': {
      return [
        // body('employees', 'Should be an array').isArray(),
        // body('employees.*.roleId', 'Product object missing').exists({
        //   checkFalsy: true,
        // }),
        body('product', 'Product object missing').exists({ checkFalsy: true }),
        body('product.name', 'product.name property missing').exists({
          checkFalsy: true,
        }),
        body('product.price', 'Product object missing').exists({
          checkFalsy: true,
        }),
        body('product.cat_id', 'cat_id must be greater then 2')
          .exists({ checkFalsy: true })
          .isInt({ gt: 2 }),
      ];
    }
    case 'updateProduct': {
      return [
        body('product', 'Product object missing').exists({ checkFalsy: true }),
        body(
          'product.price',
          'product.price property with integer value must exist'
        )
          .exists({
            checkFalsy: true,
          })
          .isInt(),
      ];
    }
    default: {
      logger.error('Didnt match any case in input validator');
    }
  }
};

// body('status').optional().isIn(['enabled', 'disabled'])
//   check('items.*.item_type').isIn([1,2,3])

exports.result = (method) => (req, res, next) => {
  switch (method) {
    case 'signUpValidationResult': {
      res.locals.validation = validationResult.withDefaults({
        formatter: (error) => ({
          msg: error.msg,
          param: error.param,
          location: error.location,
        }),
      });
      break;
    }
    default: {
      res.locals.validation = validationResult;
    }
  }
  res.locals.errors = res.locals.validation(req).array();

  if (res.locals.errors.length > 0) {
    res.status(400).json({ errors: res.locals.errors });
  } else {
    next();
  }
};
