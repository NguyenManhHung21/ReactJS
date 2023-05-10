const mongoose = require("mongoose");
const { Schema } = mongoose;
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  slug: { type: String, slug: "name" },
});

module.exports = mongoose.model("User", User);
