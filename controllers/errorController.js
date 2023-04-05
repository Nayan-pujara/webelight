module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (err.name === 'CastError') {
    err.message = `Invalid ${err.path}: ${err.value}.`;
  }

  if (err.code === 11000) {
    const value = JSON.stringify(err.keyValue);
    err.message = `Duplicate field value: ${value}. Please use another value`;
  }

  res.status(err.statusCode).json({
    status: 'error',
    message: err.message,
  });
};
