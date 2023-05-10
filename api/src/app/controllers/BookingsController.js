require("dotenv").config();
const Booking = require("../models/Booking");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_KEY;

//lấy ra 1 user
const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        reject(err);
      } else {
        resolve(userData);
      }
    });
  });
};

class BookingsController {
  //[GET] / bookings
  async getBookings(req, res) {
    try {
      const userData = await getUserDataFromReq(req);
      res.json(await Booking.find({ user: userData.id }).populate("place"));
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }

  // [POST]
  async postBookings(req, res) {
    try {
      const userData = await getUserDataFromReq(req);
      const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
        req.body;
      if (!checkIn || !checkOut || !numberOfGuests || !name || !phone)
        return res.status(422).json("Some fields do not enter!");
      Booking.create({
        place,
        user: userData.id,
        checkIn,
        checkOut,
        numberOfGuests,
        name,
        phone,
        price,
      }).then((doc) => {
        res.json(doc);
      });
    } catch (err) {
      res.status(500).send("Server error");
    }
  }
}

module.exports = new BookingsController();
