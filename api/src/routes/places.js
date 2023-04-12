const express = require("express");
const router = express.Router();
const placesController = require("../app/controllers/PlacesController");

router.get("/:id", placesController.getPlace);
router.put("/", placesController.putPlace);
router.post("/", placesController.postPlace);
router.get("/", placesController.getPlaces);
module.exports = router;
