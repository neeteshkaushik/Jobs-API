const { UnAuthorizedError, BadReqError } = require("../errors");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer "))
    throw new BadReqError("Either token is absent or in improper format");
  const token = authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { name, userId } = decoded;
    req.user = { name, userId };
    next();
  } catch (error) {
    throw new UnAuthorizedError("Not authorized to access this route");
  }
};

module.exports = auth;
