const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const displayRoutes = require("express-routemap");
const usersRoutes = require("./routes/user.routes");
const notesRoutes = require("./routes/notes.routes");

const app = express();

const PORT = 5000;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongoAvanzadoP1";

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

console.log("🚀 ~ file: app.js:16 ~ MONGO_URL:", MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const connection = mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((conn) => {
    console.log("🚀 ~ file: app.js:18 ~ CONECTADO!:");
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:20 ~ err:", err);
  });

app.use("/api/users/", usersRoutes);
app.use("/api/notes/", notesRoutes);

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT}`);
});
