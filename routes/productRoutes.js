const express = require('express');
const authController = require('../controllers/authController');
const productController = require('../controllers/productController');
const { validator, validateResponse } = require('../utility/validator');

const router = express.Router();

router
  .route('/')
  .get(authController.authenticate, productController.getAllProducts)
  .post(
    authController.authenticate,
    authController.restrictTo('admin'),
    productController.uploadProductImage,
    ...validator.createProduct,
    validateResponse,
    productController.createProduct
  );

router
  .route('/:id')
  .get(authController.authenticate, productController.getProduct)
  .patch(
    authController.authenticate,
    authController.restrictTo('admin'),
    productController.uploadProductImage,
    productController.updateProduct
  )
  .delete(authController.authenticate, authController.restrictTo('admin'), productController.deleteProduct);

module.exports = router;
