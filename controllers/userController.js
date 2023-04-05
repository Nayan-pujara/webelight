const multer = require('multer');
const User = require('../models/userModel');
const APIFeature = require('../utility/apiFeature');
const AppError = require('../utility/appError');
const catchAsync = require('../utility/catchAsync');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload only image.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('profilePic');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const feature = new APIFeature(User.find(), req.query).filter().sort().pagination();

  const allUsers = await feature.query;

  res.status(200).json({ status: 'success', result: allUsers.length, data: allUsers });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const user = await User.findById(id);

  if (!user) return next(new AppError('User not found!', 404));

  res.status(200).json({ status: 'success', data: user });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (req.body.hasOwnProperty('password'))
    return next(new AppError('Use change password route to update password!', 400));

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedUser) return next(new AppError('No user found with that id!', 404));

  res.status(200).json({ status: 'success', message: 'User have been updated successfully.' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) return next(new AppError('No user found with that id!', 404));

  res.status(200).json({ status: 'success', message: 'User have been deleted successfully.' });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (Object.keys(req.body).includes('password'))
    return next(new AppError('Use change password route to update password.', 400));

  if (req.file) req.body.profilePic = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: updatedUser,
  });
});
