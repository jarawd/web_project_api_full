const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const {authorization} = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer ", "");

  let payload;
  try {
    payload = jwt.verify(token, "dev-secret");
  } catch {
    return res.status(401).send("Authorization required");
  }

  req.user = payload;
  next();
};
