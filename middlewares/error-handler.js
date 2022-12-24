const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");

const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (err instanceof CustomError)
    res.status(err.statusCode).json({ msg: err.message });
  else res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
};

module.exports = errorHandler;
