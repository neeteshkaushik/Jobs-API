const { StatusCodes } = require("http-status-codes");
const { BadReqError, UnAuthorizedError } = require("../errors");
const User = require("../models/User");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadReqError("email and password cannot be empty");

  const user = await User.findOne({ email });
  if (!user) throw new UnAuthorizedError("Invalid credentials");

  const passwordMatched = user.comparePasswords(password);

  if (!passwordMatched) throw new UnAuthorizedError("Invalid credentials");

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    throw new BadReqError("name,email and password cannot be empty");

  const user = await User.create(req.body);
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({ user, token });
};

module.exports = { login, register };
