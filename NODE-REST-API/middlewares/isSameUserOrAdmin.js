const createHttpError = require("http-errors");

function isSameUserOrAdmin(req, res, next) {
  try {
    const { user, params } = req;
    const { id } = params;

    if (user.isAdmin || user._id === id) {
      return next();
    }

    throw new createHttpError.Forbidden("Dont have access");
  } catch (err) {
    next(err);
  }
}

module.exports = isSameUserOrAdmin;