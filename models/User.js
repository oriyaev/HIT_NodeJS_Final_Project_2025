const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  marital_status: {
    type: String,
    enum: ["single", "married", "divorced", "widowed"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
