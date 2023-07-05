const authMdw = (req, res, next) => {
  console.log("VALIDANDO SESSION!!!!!");
  if (req.session?.user) {
    return next();
  }

  return res.redirect("/login");
};

module.exports = authMdw;
