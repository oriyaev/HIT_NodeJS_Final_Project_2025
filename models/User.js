const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  last_name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  birthday: {
    type: mongoose.Schema.Types.Date,
    required: true,
  },
  marital_status: {
    type: mongoose.Schema.Types.String,
    enum: ["single", "married", "divorced", "widowed"],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
