"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var path = require("path");

var bodyParser = require("body-parser");

var pdfRouter = require("./routes/pdf");

var userRegistration = require("./routes/userRegistration");

var login = require("./routes/login");

var auth = require("./middlewares/auth");

var PORT = 3000;

require("dotenv").config();

var InitiateMongoServer = function InitiateMongoServer() {
  return regeneratorRuntime.async(function InitiateMongoServer$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(mongoose.connect(process.env.MONGOURL, {
            useNewUrlParser: true
          }));

        case 3:
          console.log("Successfully connected to MONGODB !!");
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          throw _context.t0;

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

InitiateMongoServer();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express["static"](path.join(__dirname, "./public")));
app.use("/pdf", auth, pdfRouter);
app.use("/register", userRegistration);
app.use("/login", login);
app.listen(PORT, console.log("Server running on Port ".concat(PORT)));