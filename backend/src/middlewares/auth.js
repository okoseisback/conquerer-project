const passport = require('passport');
const httpStatus = require('http-status');
const AppError = require('../utils/AppError');
const { errorMsg } = require('../constants');

const verify = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new AppError(httpStatus.UNAUTHORIZED, errorMsg.AUTH_REQUIRED));
  }

  req.user = user;
  if (requiredRights.length) {
    const userRight = role.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRight.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new AppError(httpStatus.FORBIDDEN, errorMsg.ACCESS_FORBIDDEN));
    }
  }

  resolve();
};

const auth =
  (...requiredRights) =>
    async (req, res, next) => {
      return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verify(req, resolve, reject, requiredRights))(req, res, next);
      })
        .then(() => next())
        .catch((error) => next(error));
    };

module.exports = auth;
