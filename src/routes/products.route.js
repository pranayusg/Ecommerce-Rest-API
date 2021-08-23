const express = require('express');
const productsControllers = require('../controllers/products.controller');
const checkAuth = require('../middlewares/checkAuth.middleware');
const inputValidator = require('../middlewares/inputValidator.middleware');

const router = express.Router();

router.all('*', checkAuth);

router
  .route('/')
  .get(productsControllers.getAllProducts)
  .post(
    inputValidator.validate('createProduct'),
    inputValidator.result(),
    productsControllers.createProduct
  );

router
  .route('/:productId')
  .patch(
    inputValidator.validate('updateProduct'),
    inputValidator.result(),
    productsControllers.updateProductPrice
  )
  .delete(productsControllers.deleteProduct);

module.exports = router;
