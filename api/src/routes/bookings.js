const express = require("express");
const router = express.Router();
const bookingsController = require("../app/controllers/BookingsController");

router.get("/by-account", bookingsController.getBookingsByAccount);
router.post("/", bookingsController.postBookings);
router.get("/", bookingsController.getBookings);

module.exports = router;
