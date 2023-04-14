const Booking = require("../models/Booking");

class DelPlaceController {
  async delBookingPlace(req, res) {
    const { id } = req.params;
    try {
      if (!id) {
        res.status(422).json("id is not exist");
        return;
      }
      await Booking.deleteOne({ _id: id });
      res.status(200).json("delete was successful");
    } catch (err) {
      res.status(500).json("error: " + err.message);
    }
  }
}

module.exports = new DelPlaceController();
