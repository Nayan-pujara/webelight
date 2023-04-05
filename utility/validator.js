const { body, validationResult } = require('express-validator');

exports.validator = {
  // 1) Users Validators
  registerUser: [
    body('email').isEmail().withMessage('Please enter valid email.'),
    body('name').notEmpty().withMessage('Name can not be empty.'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Password length at least have to be 8 character.'),
    body('role').custom((value) => {
      if (!['admin', 'customer'].includes(value)) {
        return Promise.reject('Role value must be either admin or customer.');
      } else {
        return true;
      }
    }),
  ],

  loginUser: [
    body('email').notEmpty().withMessage('Email can not be empty.'),
    body('password').notEmpty().withMessage('Password can not be empty.'),
  ],

  changePassword: [
    body('currentPassword').notEmpty().withMessage('Current password can not be empty.'),
    body('newPassword')
      .notEmpty()
      .isLength({ min: 8 })
      .withMessage('New password length at least have to be 8 character.'),
    body('confirmPassword').notEmpty().withMessage('Confirm password can not be empty.'),
  ],
};

exports.validateResponse = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const msg = errors
      .array()
      .map((err) => {
        return `${err.msg}`;
      })
      .join(', ');

    return res.status(400).json({ status: 'error', message: msg });
  }

  next();
};
