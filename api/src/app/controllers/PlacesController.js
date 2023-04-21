const Place = require("../models/Place");
const jwt = require("jsonwebtoken");
const jwtSecret = "usadWdu32iUIAs4ad2";
class PlacesController {
  //show page main
  async getPlaces(req, res) {
    res.json(await Place.find());
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
