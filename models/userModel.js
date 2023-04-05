const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please enter your email'],
    lowercase: true,
    unique: true,
    validate: [validator.isEmail, 'Please enter valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'customer'],
    required: [true, 'Please specify the role'],
  },
  profilePic: {
    type: String,
  },
});

// Document Middleware
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance Method
userSchema.methods.checkPassword = async function (loginPassword, userPassword) {
  return await bcrypt.compare(loginPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
