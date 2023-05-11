const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose
      .connect("mongodb://localhost:27017/Booking-App")
      .then(() => console.log("Connected!"));
  } catch (error) {
    console.log("Connect faild");
  }
};

module.exports = { connect };
