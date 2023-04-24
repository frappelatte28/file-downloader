const PDFDocument = require("pdfkit");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/getPdf", (req, res, next) => {
  res.setHeader("Content-Type", "application/pdf");
  let email = req.decoded.data.email;
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(27).text("This is pdf for user " + email, 100, 100);
  doc.end();
});

module.exports = router;
