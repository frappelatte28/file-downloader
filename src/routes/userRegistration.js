const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

router.post("/", async (req, res, next) => {
  try {
    let user;
    let email = req?.body?.email;
    let password = req?.body?.password;

    if (!email) {
      user = await User.findOne({ email: email });
    }

    if (!user) {
      user = new User({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res
        .status(201)
        .send(
          "<div align ='center'><h2>Registration successful</h2></div><br><br><div align='center'><a href='./login.html'>login</a></div><br><br><div align='center'><a href='./registration.html'>Register another user</a></div>"
        );
    } else {
      res
        .status(400)
        .send(
          "<div align ='center'><h2>Email already used</h2></div><br><br><div align='center'><a href='./registration.html'>Register again</a></div>"
        );
    }
  } catch (err) {
    res.status(500).send("Internal server error" + err);
  }
});

module.exports = router;
