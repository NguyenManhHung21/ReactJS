const express = require("express");
const router = express.Router();
const delPlaceController = require("../app/controllers/DelPlaceController");

router.delete("/softDel-place/:id", delPlaceController.softDelete);
router.get("/placesDeleted", delPlaceController.getPlacesDeleted);
router.patch("/retore-place/:id", delPlaceController.restorePlace);
router.delete("/permanentDelete/:id", delPlaceController.permanenceDeleted);
module.exports = router;
