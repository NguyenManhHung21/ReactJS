const express = require("express");
const router = express.Router();
const cancellBookingController = require("../app/controllers/CancelBookingController");

router.delete("/cancel-booking/:id", cancellBookingController.delBookingPlace);
router.delete("paid-bookings", cancellBookingController.paidBookingPlaces);
module.exports = router;
