require("dotenv").config();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET_KEY;


class LoginController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const userDoc = await UserModel.findOne({ email });

      if (!userDoc) return res.status(422).json("email not OK");

      const passOK = bcrypt.compareSync(password, userDoc.password);
      if (!passOK) return res.status(422).json("pass not OK");

      const tokenOptions = {};
      const token = jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        tokenOptions
      );

      res.cookie("token", token).json(userDoc);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

module.exports = new LoginController();
