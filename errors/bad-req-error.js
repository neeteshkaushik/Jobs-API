const CustomError = require("./customError");
const { StatusCodes } = require("http-status-codes");
class BadReqError extends CustomError {
  constructor(message) {
    super(StatusCodes.BAD_REQUEST, message);
  }
}

module.exports = BadReqError;
