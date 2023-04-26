const Place = require("../models/Place");
const jwt = require("jsonwebtoken");
const jwtSecret = "usadWdu32iUIAs4ad2";
const User = require("../models/User");
class PlacesController {
  //show page main
  getPlaces(req, res) {
    const results = res.paginatedResults.results.map((place) => ({
      ...place.toObject(),
      owner: place.owner.name, // replace the owner object with the name field
    }));
    // res.json(res.paginatedResults);
    res.json({ ...res.paginatedResults, results });
  }

  paginatedResults(model) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const results = {};

      const modelList = await model.find();

      if (endIndex < modelList.length) {
        results.next = {
          page: page + 1,
          limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit,
        };
      }
      try {
        // results.results = modelList.slice(startIndex, endIndex);
        results.results = await model
          .find()
          .populate({
            path: "owner",
            select: "name -_id",
          })
          .limit(limit)
          .skip(startIndex)
          .exec();
        res.paginatedResults = results;

        next();
      } catch (error) {
        res.status(500).json({ message: error });
      }
    };
  }

  //[GET] show a detail place when clicking on it
  async getPlace(req, res) {
    const { id } = req.params;
    res.json(await Place.findById(id));
  }

  //[PUT] edit a place
  async putPlace(req, res) {
    try {
      const { token } = req.cookies;
      if (!token) res.status(422).json("There are not data from UI!");
      const {
        id,
        name,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      } = req.body;
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.findById(id);
        if (userData.id === placeDoc.owner.toString()) {
          placeDoc.set({
            name,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          });
          await placeDoc.save();
          res.json("OK");
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(`Error: ${error}`);
    }
  }

  //   [POST] create a new place
  async postPlace(req, res) {
    try {
      const { token } = req.cookies;
      if (!token) res.status(422).json("There are not data from UI!");
      const {
        name,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      } = req.body;
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const placeDoc = await Place.create({
          owner: userData.id,
          name,
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        });
        res.json(placeDoc);
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(`Error: ${error}`);
    }
  }
}

module.exports = new PlacesController();
