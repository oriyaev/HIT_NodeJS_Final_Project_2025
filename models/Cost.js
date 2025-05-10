const mongoose = require("mongoose");

const costCategories = ["food", "health", "housing", "sport", "education"];

const costSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: costCategories,
    required: true,
  },
  userid: {
    type: String,
    ref: "User",
    required: true,
  },
  sum: {
    type: Number,
    required: true,
    min: 0,
  },
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
    required: true,
    min: 1900,
    max: 2100,
  },
});

const Cost = mongoose.model("Cost", costSchema);

module.exports = Cost;
