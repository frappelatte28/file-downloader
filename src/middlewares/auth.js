const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers["authtoken"];

  if (!token) {
    res.status(403).send("Token is missing");
  }
  try {
    const decoded = await jwt.verify(token, process.env.SECRETKEY);
    req.decoded = decoded;
  } catch (err) {
    res.status(401).send("Invalid Token");
  }
  next();
};

module.exports = verifyToken;
