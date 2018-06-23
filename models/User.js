const mongoose = require("mongoose");
const { Schema } = mongoose;

// Create Schema
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    default: 0
  },
  password: {
    type: String
  }
});

// module.exports = User = mongoose.model("users", UserSchema);
mongoose.model("users", userSchema);
