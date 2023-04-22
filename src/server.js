const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const URL =
  "mongodb+srv://Pragya2805:_CXfhc3P54z@cluster0.ozog75w.mongodb.net/?retryWrites=true&w=majority";
const app = express();
const PORT = 3000;
const path = require("path");
const User = require("./models/user.model");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const pdfRouter = require("./routes/pdf");

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
    });
    console.log("Successfully connected to MONGODB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

InitiateMongoServer();

app.use("/pdf", pdfRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));

app.post("/register", async (req, res) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email: email });
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

app.post("/login", async (req, res) => {
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
      "secretKey"
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

app.listen(PORT, console.log(`Server running on Port ${PORT}`));
