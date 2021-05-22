const mongoose = require('mongoose');

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isWarningOpen: {
    type: Boolean,
    required: false,
    default: false,
  }
});

module.exports = mongoose.model('User', User, 'User');
