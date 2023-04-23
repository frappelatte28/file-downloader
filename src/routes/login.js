const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    let user = await User.findOne({ email: email });

    let token = await jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: {
          email,
        },
      },
      process.env.SECRETKEY
    );
    let url = `/pdf/getPdf/${token}`;

    if (user) {
      let storedPass = user.password;
      const passwordMatch = await bcrypt.compare(password, storedPass);

      if (passwordMatch) {
        res.send(
          `<div align ='center'><h2>Login successful</h2></div><br><br><br><div align ='center'><a href=${url}>Get your pdf from here!</a></div><br><br><div align='center'><a href='./login.html'>logout</a></div>`
        );
      } else {
        res.send(
          "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>"
        );
      }
    } else {
      res.send(
        "<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>"
      );
    }
  } catch (err) {
    console.log(err);
    res.send("Internal server error");
  }
});

module.exports = router;
