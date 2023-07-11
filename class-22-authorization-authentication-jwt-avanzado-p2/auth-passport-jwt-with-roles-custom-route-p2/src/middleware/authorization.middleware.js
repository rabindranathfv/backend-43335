const authorization = (role) => {
  return async (req, res, next) => {
    console.log(
      "🚀 ~ file: authorization.middleware.js:9 ~ return ~ req.user.role:",
      req.user.user
    );
    if (!req.user) return res.status(401).json({ message: `Unauthorized` });
    if (req.user.user.role != role)
      return res.status(401).json({ message: "No enought permissions" });

    next();
  };
};

module.exports = authorization;
