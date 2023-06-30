const express = require("express");
const cookieParser = require("cookie-parser");
const handlebars = require("express-handlebars");
const session = require("express-session");
const displayRoutes = require("express-routemap");
const viewsRoutes = require("./routes/views.routes");
const cookiesRoutes = require("./routes/cookies.routes");
const sessionRoutes = require("./routes/session.routes");
const authMdw = require("./middleware/auth.middleware");

const app = express();

const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(
  session({
    secret: "coderSecret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("/api/session/", sessionRoutes);
app.use("/api/private/", authMdw, (req, res) => {
  console.log("🚀 ~ file: app.js:33 ~ app.use ~ req.session:", req.session);
  const username = req.session.user;
  return res.json({
    message: `route protected, you are welcome user ${username}`,
  });
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT}`);
});
