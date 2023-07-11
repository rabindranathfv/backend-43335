const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const displayRoutes = require("express-routemap");
const sessionRoutes = require("./routes/session.routes");
const usersRoutes = require("./routes/user.routes");
const passport = require("passport");
const initializePassport = require("./config/passport.config");

const app = express();

const PORT = 5000;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongoStrategyJWTDB";

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

console.log("ROUTE** PUBLIC", `${__dirname}/public`);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(`../${__dirname}/public`));

initializePassport();
app.use(passport.initialize());

const connection = mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:18 ~ CONECTADO!:");
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:20 ~ err:", err);
  });

app.use("/api/session/", sessionRoutes);
app.use("/api/users/", usersRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT}`);
});
