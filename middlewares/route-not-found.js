const { StatusCodes } = require("http-status-codes");
const routeNotFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).send("No such route exists");
};

module.exports = routeNotFound;
