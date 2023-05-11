require("dotenv").config();
const Place = require("../models/Place");
const jwtSecret = process.env.JWT_SECRET_KEY;
const jwt = require("jsonwebtoken");

class DelPlaceController {
  softDelete(req, res, next) {
    try {
      const { token } = req.cookies;
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        await Place.delete({ _id: req.params.id, owner: id });
        res.status(200).json("soft-deleted was successful");
      });
    } catch (error) {
      res.status(500).json("error: " + error);
    }
  }

  getPlacesDeleted(req, res, next) {
    try {
      const { token } = req.cookies;
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        res.json(await Place.findDeleted({ owner: id }));
      });
    } catch (error) {
      res.status(500).json("error: " + error);
    }
  }

  restorePlace(req, res, next) {
    try {
      const { token } = req.cookies;
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        await Place.restore({ _id: req.params.id, owner: id });
        // res.status(200).json("soft-deleted was successful");
      });
      res.status(200).json("restore successful");
    } catch (error) {
      res.status(500).json("error: " + error);
    }
  }

  permanenceDeleted(req, res, next) {
    try {
      const { token } = req.cookies;
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        await Place.deleteOne({ _id: req.params.id, owner: id });
      });
      res.status(200).json("delete successfully!");
    } catch (error) {
      res.status(500).json("error: " + error);
    }
  }
}

module.exports = new DelPlaceController();
