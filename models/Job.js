const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxLength: 30,
      minLength: 3,
    },
    position: {
      type: String,
      required: [true, "Please provide postion"],
      maxLength: 20,
      minLength: 3,
    },
    status: {
      type: String,
      enum: ["interview", "rejected", "pending", "selected"],
      default: "pending",
      required: [true, "Please provide status"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Pleasae provide createdBy"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
