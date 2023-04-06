const Product = require('../models/productModel');
const APIFeature = require('../utility/apiFeature');
const AppError = require('../utility/appError');
const catchAsync = require('../utility/catchAsync');
const upload = require('../utility/multer');

exports.uploadProductImage = upload.single('image');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const feature = new APIFeature(Product.find(), req.query).filter().sort().pagination();

  const allProducts = await feature.query;

  res.status(200).json({ status: 'success', result: allProducts.length, data: allProducts });
});

exports.createProduct = catchAsync(async (req, res, next) => {
  if (!req.file) return next(new AppError('Please provide product image'));

  req.body.image = req.file.filename;

  const newProduct = await Product.create(req.body);

  res.status(200).json({ status: 'success', data: newProduct });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  if (!product) return next(new AppError('Product not found!', 404));

  res.status(200).json({ status: 'success', data: product });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  if (req.file) req.body.image = req.file.filename;

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedProduct) return next(new AppError('No product found with that id!', 404));

  res.status(200).json({ status: 'success', message: 'Product updated successfully' });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const id = req.params.id;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) return next(new AppError('No product found with that id!', 404));

  res.status(200).json({ status: 'success', message: 'Product have been deleted successfully.' });
});
