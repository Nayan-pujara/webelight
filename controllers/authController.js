const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const AppError = require('../utility/appError');
const catchAsync = require('../utility/catchAsync');

exports.registerUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(200).json({ status: 'success', data: newUser });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password, user.password)))
    return next(new AppError('Invalid email or password!', 400));

  const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.authenticate = catchAsync(async (req, res, next) => {
  const token = req.headers?.authorization?.split(' ')[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decode.id);

  if (!user) return next(new AppError('User belongs to the token no longer available.', 400));

  req.user = user;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You are not authorized!', 401));
    }
    next();
  };
};

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword)
    return next(new AppError('New password and confirm password does not match!', 400));

  const user = await User.findById(req.user.id).select('+password');

  if (!(await user.checkPassword(currentPassword, user.password)))
    return next(new AppError('Your current password is incorrect!', 400));

  user.password = newPassword;
  await user.save();

  res.status(200).json({ status: 'success', message: 'Password have been changed successfully.' });
});
