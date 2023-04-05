const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const { validator, validateResponse } = require('../utility/validator');

const router = express.Router();

router.post('/register', ...validator.registerUser, validateResponse, authController.registerUser);
router.post('/login', ...validator.loginUser, validateResponse, authController.loginUser);
router.post(
  '/changePassword',
  authController.authenticate,
  ...validator.changePassword,
  validateResponse,
  authController.changePassword
);
router.patch(
  '/updateMe',
  authController.authenticate,
  authController.restrictTo('customer'),
  userController.uploadUserPhoto,
  userController.updateMe
);

router.get('/', authController.authenticate, authController.restrictTo('admin'), userController.getAllUsers);
router
  .route('/:id')
  .get(authController.authenticate, authController.restrictTo('admin'), userController.getUser)
  .patch(authController.authenticate, authController.restrictTo('admin'), userController.updateUser)
  .delete(authController.authenticate, authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
