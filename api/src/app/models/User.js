const mongoose = require("mongoose");
const { Schema } = mongoose;

const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;
