const express = require("express");
const router = express.Router();
const delPlaceController = require("../app/controllers/DelPlaceController");

router.delete("/del-place/:id", delPlaceController.delBookingPlace);

module.exports = router;
