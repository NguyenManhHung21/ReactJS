const mongoose = require("mongoose");
const Booking = new mongoose.Schema({
  place: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place" },
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  numberOfGuests: Number,
  name: { type: String, required: true },
  phone: { type: String, required: true },
  price: Number,
});

module.exports = mongoose.model("Booking", Booking);
