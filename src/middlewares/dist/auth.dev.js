"use strict";

var jwt = require("jsonwebtoken");

var verifyToken = function verifyToken(req, res, next) {
  var token, decoded;
  return regeneratorRuntime.async(function verifyToken$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          token = req.headers["authtoken"];

          if (!token) {
            res.status(403).send("Token is missing");
          }

          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(jwt.verify(token, process.env.SECRETKEY));

        case 5:
          decoded = _context.sent;
          req.decoded = decoded;
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](2);
          res.status(401).send("Invalid Token");

        case 12:
          next();

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 9]]);
};

module.exports = verifyToken;