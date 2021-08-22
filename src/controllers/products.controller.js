const { validationResult } = require('express-validator');
const productsModel = require('../models/products.model');
const mailService = require('../services/mail.service');
const logger = require('../lib/logger');

const signUpValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    msg: error.msg,
    param: error.param,
    location: error.location,
  }),
});

const createProduct = (req, res) => {
  if (!req.body.product) {
    res.status(400).send('Please specify the product details');
  }

  res.locals.product = req.body.product;

  productsModel
    .saveProduct(res.locals.product)
    .then((savedProduct) => {
      res.status(201).json({
        message: 'Product Saved',
        product: savedProduct,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to save product ',
        err,
      });
    });
};

const getAllProducts = (req, res) => {
  productsModel
    .find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to retrieve products',
        err,
      });
    });
};

const updateProductPrice = (req, res) => {
  if (!req.params.productId) {
    res.status(400).send('Please specify ProductId to update products');
  }

  productsModel
    .findByIdAndUpdate(req.params.productId, req.body.product)
    .then((count) => {
      if (!count) {
        return res
          .status(404)
          .send({ message: 'No Product to update or Price is same' });
      }

      res.status(201).json({
        message: 'Product Updated',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to update products',
        err,
      });
    });
};

const deleteProduct = (req, res) => {
  if (!req.params.productId) {
    res.status(400).send('Please specify ProductId to delete products');
  }

  productsModel
    .removeById(req.params.productId)
    .then((count) => {
      if (!count) {
        return res.status(404).send({ message: 'No Product to delete' });
      }

      res.status(200).json({
        message: 'Product Deleted',
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Unable to delete products',
        error: err,
      });
    });
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProductPrice,
  deleteProduct,
};
