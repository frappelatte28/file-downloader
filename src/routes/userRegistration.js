const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

router.post("/", async (req, res, next) => {
  try {
    let user;
    let email = req?.body?.email;
    let password = req?.body?.password;

    user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).send("User Already Exist, Please login");
    }

    if (!user) {
      user = new User({
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      const token = await jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: {
            email,
          },
        },
        process.env.SECRETKEY
      );

      await user.save();
      user.token = token;
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
