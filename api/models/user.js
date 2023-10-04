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
  resume: {
    data: Buffer,
    contentType: String,
  },
  verificationToken: String,
});

const user = mongoose.model("user", userSchema);
module.exports = user;
