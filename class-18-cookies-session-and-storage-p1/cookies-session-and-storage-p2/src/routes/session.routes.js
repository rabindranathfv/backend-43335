const { Router } = require("express");

const router = Router();

// localhost:5000/api/session/login?username=rabin&password=123456&email=rferreira@gmail.com
router.get("/login", async (req, res) => {
  // const {
  //   username: userQuery,
  //   password: pswQuery,
  //   email: emailQuery,
  // } = req.query;
  // console.log(
  //   "🚀 ~ file: session.routes.js:9 ~ router.get ~ userQuery:",
  //   userQuery,
  //   emailQuery
  // );
  // const { username, password, email } = req.body;
  // console.log(
  //   "🚀 ~ file: session.routes.js:7 ~ router.get ~ username:",
  //   username,
  //   password
  // );

  const username = req.body.username ?? req.query.username;
  // TODO: NO DEBEMOS ENVIAR PASSWORD POR LA URL
  const password = req.body.password ? req.body.password : req.query.password;
  const email = req.body.email || req.query.email;

  if (username !== "rabin" || password !== "123456") {
    return res.json({ message: "login fallido" });
  }
  console.log(
    "🚀 ~ file: session.routes.js:18 ~ router.get ~ req.session:",
    req.session
  );

  req.session["user"] = username || userQuery;
  req.session.admin = true;
  req.session.email = email || emailQuery;
  return res.json({
    message: "login success",
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.json({ message: `logout successfully` });
    return res.send({ message: `logout Error`, body: err });
  });
});

router.get("/welcome", async (req, res) => {
  // /welcome?name = rabin
  const { name } = req.query;
  console.log("🚀 ~ file: session.routes.js:29 ~ router.get ~ name:", name);

  const counter = req.session?.counter;
  if (!counter) {
    req.session.counter = 1;
    return res.send(`Te damos la bienvenida ${name}`);
  }

  req.session.user = name;
  req.session.admin = true;
  req.session.counter++;
  return res.send(
    `has ingresado ${name} exitosamente, unas ${req.session.counter} veces`
  );
});

module.exports = router;
