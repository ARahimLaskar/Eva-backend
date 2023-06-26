const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    res.send("please login");
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      res.send("please login");
    } else {
      req.body.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { authenticate };
