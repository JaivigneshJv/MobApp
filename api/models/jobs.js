const mongoose = require("mongoose");

const jobsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
        required: true,
      },
    ],
    salary: {
      type: String,
      required: true,
    },
    datePosted: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const job = mongoose.model("job", jobsSchema);
module.exports = job;
