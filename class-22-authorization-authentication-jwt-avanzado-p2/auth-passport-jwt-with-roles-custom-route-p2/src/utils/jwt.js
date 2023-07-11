const jwt = require("jsonwebtoken");
const passport = require("passport");

const SECRET_JWT = "CLAVEs3p3rs3cr3t4S1s1";

const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, SECRET_JWT, { expiresIn: "30m" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("can not generate jwt token");
      }
      resolve(token);
    });
  });
};

const cookieExtractor = () => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["coderCookieToken"];
  }

  return token;
};

passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);

      if (!user) {
        return res.status(401).json({
          error: info.messages ? info.messages : info.toString(),
          message: `error in jwt`,
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

module.exports = {
  generateJWT,
  SECRET_JWT,
  cookieExtractor,
  passportCall,
};
