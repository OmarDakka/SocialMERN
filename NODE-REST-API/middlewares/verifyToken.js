const createHttpError = require("http-errors");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];

    if (!token) {
      throw new createHttpError.Unauthorized(
        "A token is required for authentication"
      );
    }

    const decoded = jwt.verify(token, "=3N^:yGJav~~ZJ.M");

    if (Date.now() / 1000 > decoded.exp) {
      throw new createHttpError.Unauthorized("Token expired");
    }

    req.user = await User.findById(decoded.userId);

    return next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return next(new createHttpError.BadRequest(err.message));
    }
    return next(err);
  }
};

module.exports = verifyToken;