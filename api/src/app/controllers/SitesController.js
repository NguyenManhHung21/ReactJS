const Place = require("../models/Place");
const User = require("../models/User");
const jwtSecret = "usadWdu32iUIAs4ad2";
const jwt = require("jsonwebtoken");
class SitesController {
  async validationEmailRegis(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findOne({ email });
      if (user) {
        res.json({ isEmailExist: true });
      } else {
        res.json({ isEmailExist: false });
      }
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  homePage(req, res) {
    try {
      const { token } = req.cookies; //gửi yêu cầu tới cookie để lấy ra mã token
      if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
          if (err) throw err;
          const { name, email, _id } = await User.findById(userData.id);
          res.json({ name, email, _id });
        });
      } else {
        res.json(null);
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  logout(req, res) {
    //reset cookies
    res.cookie("token").json(true); // lúc này sign sẽ để trống
  }

  getPlaceOfUser(req, res) {
    try {
      const { token } = req.cookies;
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const { id } = userData;
        Promise.all([
          await Place.find({ owner: id }),
          await Place.countDocumentsDeleted({ owner: id }),
        ]).then(([places, deleteCount]) => {
          res.json({ places, deleteCount });
        });
      });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getSearch(req, res, next) {
    try {
      const { q } = req.query;
      const escapeRegExp = (string) =>
        string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      // escapeRegExp(string) {
      //   return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
      // }
      const places = await Place.find({
        title: new RegExp(`${escapeRegExp(q)}`, "i"),
      });
      res.json(places);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SitesController();
