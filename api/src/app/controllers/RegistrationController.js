const bcrypt = require("bcryptjs");
const User = require("../models/User");
const bcryptSalt = bcrypt.genSaltSync(10);

class RegistrationController {
  async registration(req, res) {
    const { name, email, password } = req.body;
    try {
      await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });
      res.json("registration successful");
    } catch (err) {
      res.status(422).json(`Error: ${err.message}`);
    }
  }

  
}

module.exports = new RegistrationController();
