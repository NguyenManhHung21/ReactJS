const mongoose = require("mongoose");
const { Schema } = mongoose;

const Place = new Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  name: String,
  title: String,
  address: String,
  photos: [String],
  description: String,
  perks: [String],
  extraInfo: String,
  checkIn: Number,
  checkOut: Number,
  maxGuests: Number,
  price: Number,
});

const PlaceModel = mongoose.model("Place", Place);

module.exports = PlaceModel;
