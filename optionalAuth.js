const jwt = require("jsonwebtoken");

exports.optionalAuth = (req, res, next) => {
  const header = req.headers["authorization"];
  if (!header) {
    req.user = null;
    return next();
  }

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    req.user = null;
    return next();
  }
};
