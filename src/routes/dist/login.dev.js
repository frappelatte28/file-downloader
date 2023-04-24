"use strict";

var express = require("express");

var router = express.Router();

var bcrypt = require("bcrypt");

var User = require("../models/user.model");

var jwt = require("jsonwebtoken");

router.post("/", function _callee(req, res) {
  var email, password, user, token, storedPass, passwordMatch;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          email = req.body.email;
          password = req.body.password;
          _context.next = 5;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 5:
          user = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: {
              email: email
            }
          }, process.env.SECRETKEY));

        case 8:
          token = _context.sent;

          if (!user) {
            _context.next = 17;
            break;
          }

          storedPass = user.password;
          _context.next = 13;
          return regeneratorRuntime.awrap(bcrypt.compare(password, storedPass));

        case 13:
          passwordMatch = _context.sent;

          if (passwordMatch) {
            res.send("<html lang=\"en\">\n          <head>\n            <meta charset=\"UTF-8\" />\n            <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n            <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n            <title>Document</title>\n            <script>\n            function download(blob, filename) {\n              const url = window.URL.createObjectURL(blob);\n              const a = document.createElement('a');\n              a.style.display = 'none';\n              a.href = url;\n              // the filename you want\n              a.download = filename;\n              document.body.appendChild(a);\n              a.click();\n              document.body.removeChild(a);\n              window.URL.revokeObjectURL(url);\n            }\n            function getPdf() {\n              fetch(\"http://localhost:3000/pdf/getPdf\", {\n                method: \"GET\",\n                headers: {\n                  \"authtoken\": \"".concat(token, "\",\n                },\n              })\n                .then((response) => response.blob())\n                .then((response) => download(response, \"pdf.pdf\"))\n                .catch((err) => console.error(err));\n            }\n            </script>\n          </head>\n            <body>\n              <div align ='center'><h2>Login successful</h2></div>\n              <button align ='center' onClick=\"getPdf()\">Click me!</button>\n              <br /><br />\n              <a href='./login.html'>logout</a>\n            </body>\n        </html>"));
          } else {
            res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align ='center'><a href='./login.html'>login again</a></div>");
          }

          _context.next = 18;
          break;

        case 17:
          res.send("<div align ='center'><h2>Invalid email or password</h2></div><br><br><div align='center'><a href='./login.html'>login again<a><div>");

        case 18:
          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.send("Internal server error");

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 20]]);
});
module.exports = router;