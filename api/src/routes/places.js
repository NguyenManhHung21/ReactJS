const express = require("express");
const router = express.Router();
const placesController = require("../app/controllers/PlacesController");
const Place = require("../app/models/Place");

router.get("/:id", placesController.getPlace);
router.put("/", placesController.putPlace);
router.post("/", placesController.postPlace);
router.get(
  "/",
  placesController.paginatedResults(Place),
  placesController.getPlaces
);
module.exports = router;
