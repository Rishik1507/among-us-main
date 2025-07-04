const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  alive: {
    type: Boolean,
    required: true,
    default: true
  },
  uid: {
    type: String,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('User', userSchema);
