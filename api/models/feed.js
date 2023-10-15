const mongoose = require("mongoose");

const feedSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const feed = mongoose.model("feed", feedSchema);

module.exports = feed;
