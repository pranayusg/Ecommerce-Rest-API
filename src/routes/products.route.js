const express = require("express");
const productsControllers = require("../controllers/products.controller");
const checkAuth = require("../middlewares/checkAuth.middleware");

const router = express.Router();

router.all("*", checkAuth);

router
  .route("/")
  .get(productsControllers.getAllProducts)
  .post(productsControllers.createProduct)
  .patch(productsControllers.updateProduct)
  .delete(productsControllers.deleteProduct);

module.exports = router;
