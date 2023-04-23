const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const path = require("path");
const bodyParser = require("body-parser");
const pdfRouter = require("./routes/pdf");
const userRegistration = require("./routes/userRegistration");
const login = require("./routes/login");

require("dotenv").config();

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
    });
    console.log("Successfully connected to MONGODB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

InitiateMongoServer();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./public")));
app.use("/pdf", pdfRouter);
app.use("/register", userRegistration);
app.use("/login", login);

app.listen(PORT, console.log(`Server running on Port ${PORT}`));
