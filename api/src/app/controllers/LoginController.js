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

      const tokenOptions = { expiresIn: '1000s' };
      const token = jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        tokenOptions
      );
      // // Cookies that have not been signed
      // console.log('Cookies: ', req.cookies);
      // // Cookies that have not been signed
      // console.log('Cookies: ', req.cookies)
      res.cookie("token", token);
      res.json(userDoc);

    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

module.exports = new LoginController();
