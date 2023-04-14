const express = require("express");
const router = express.Router();
const registrationController = require("../app/controllers/RegistrationController");

router.post("/", registrationController.registration);

module.exports = router;
