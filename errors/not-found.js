const CustomError = require("./customError");
const { StatusCodes } = require("http-status-codes");
class NotFoundError extends CustomError {
  constructor(message) {
    super(StatusCodes.NOT_FOUND, message);
  }
}

module.exports = NotFoundError;
