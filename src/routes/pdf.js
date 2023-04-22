const PDFDocument = require("pdfkit");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/getPdf/:token", (req, res, next) => {
  let token = req.params?.token;
  if (!token) {
    res.status(500).send("Token not found");
  }
  let email;
  try {
    const decoded = jwt.verify(token, process.env.SECRETKEY);
    email = decoded.data.email;
  } catch (err) {
    // console.log(err);
    res.status(500).send("Invalid token");
  }
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.fontSize(27).text("This is pdf for user " + email, 100, 100);
  doc.end();
});

module.exports = router;
