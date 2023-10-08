const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  regno: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  Xpercentage: {
    type: Number,
    required: true,
    default: 0,
  },
  XIIpercentage: {
    type: Number,
    required: true,
    default: 0,
  },
  cgpa: {
    type: Number,
    required: true,
    default: 0,
  },
  branch: {
    type: String,
    required: false,
  },
  verificationToken: String,
});

const user = mongoose.model("user", userSchema);
module.exports = user;
