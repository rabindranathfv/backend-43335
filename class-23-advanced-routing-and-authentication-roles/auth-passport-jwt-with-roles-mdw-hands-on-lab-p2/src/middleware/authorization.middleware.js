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

// PUBLIC puede consumir solo endpoint gets
// USER puede consumir solo endpoint gets + ENDPOINT CURRENT
// MANAGER puede hacer lo anterior del USER + ENDPOINT PACH, PUT
// ADMIN puede hacer TODO EL CRUD DE usuarios

module.exports = authorization;
