const express = require("express");
const router = express.Router();
const bookingsController = require("../app/controllers/BookingsController");

router.post("/", bookingsController.postBookings);
router.get("/", bookingsController.getBookings);

module.exports = router;
