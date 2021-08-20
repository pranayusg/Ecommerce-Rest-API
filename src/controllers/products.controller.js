const { validationResult } = require("express-validator");
const productsModel = require("../models/products.model");
const mailService = require("../services/mail.service");
const logger = require("../lib/logger");

const signUpValidationResult = validationResult.withDefaults({
  formatter: (error) => ({
    msg: error.msg,
    param: error.param,
    location: error.location,
  }),
});

const createProduct = (req, res) => {
  if (!req.body.product) {
    res.status(500).send("Please specify the product details");
  }

  const product = req.body.product;

  productsModel
    .create(product)
    .then(() => {
      res.status(200).json({
        message: "Product Saved",
        product: product,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Unable to save product" + err,
      });
    });
};

const getAllProducts = (req, res) => {
  productsModel
    .getAll()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      res.status(404).json({
        message: "Unable to retrieve products" + err,
      });
    });
};

const updateProduct = (req, res) => {
  if (!req.params.productId) {
    res.status(500).send("Please specify ProductId to update products");
  }

  productsModel
    .findByIdAndUpdate(req.params.productId)
    .then(() => {
      res.status(200).json({
        message: "Product Updated",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Unable to update products" + err,
      });
    });
};

const deleteProduct = (req, res) => {
  if (!req.params.productId) {
    res.status(500).send("Please specify ProductId to delete products");
  }

  productsModel
    .removeById(req.params.productId)
    .then(() => {
      res.status(200).json({
        message: "Product Deleted",
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "Unable to delete products" + err,
      });
    });
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
