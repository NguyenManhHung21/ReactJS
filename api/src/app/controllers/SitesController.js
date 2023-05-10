const Place = require("../models/Place");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET_KEY;
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_KEY);

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
          const { name, email, _id, slug } = await User.findById(userData.id);
          res.json({ name, email, _id, slug });
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

  async payment(req, res) {
    const { slugName } = req.body;
    const { bookings } = req.body;
    const line_items = bookings.map((item) => {
      // const imageUrl = item.place.photos[0];
      // const imageBlob = await fetch(imageUrl).then((response) =>
      //   response.blob()
      // );
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.place.title,
            // images: [URL.createObjectURL(imageBlob)],
            description: item.place.address,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: 1,
      };
    });
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/account/bookings/${slugName}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/account/bookings`,
    });
    res.send({ url: session.url });
  }
}

module.exports = new SitesController();
