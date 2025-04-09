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
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
});

const Cost = mongoose.model("Cost", costSchema);

module.exports = Cost;
