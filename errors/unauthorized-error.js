const CustomError = require("./customError");
const { StatusCodes } = require("http-status-codes");
class UnAuthorizedError extends CustomError {
  constructor(message) {
    super(StatusCodes.UNAUTHORIZED, message);
  }
}

module.exports = UnAuthorizedError;
