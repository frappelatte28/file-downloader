"use strict";

var PDFDocument = require("pdfkit");

var express = require("express");

var router = express.Router();

var jwt = require("jsonwebtoken");

router.get("/getPdf", function (req, res, next) {
  res.setHeader("Content-Type", "application/pdf");
  var email = req.decoded.data.email;
  var doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(27).text("This is pdf for user " + email, 100, 100);
  doc.end();
});
module.exports = router;