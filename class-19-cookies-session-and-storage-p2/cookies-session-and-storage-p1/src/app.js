import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import session from "express-session";
import displayRoutes from "express-routemap";
// import viewsRoutes from "./routes/views.routes.js";
// import cookiesRoutes from "./routes/cookies.routes.js";
import sessionRoutes from "./routes/session.routes.js";
import mongoStore from "connect-mongo";
import __dirname from "./utils/index.js";
import { authMdw } from "./middleware/auth.middleware.js";

const app = express();

const PORT = 5000;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "mongoSessionDB";

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: MONGO_URL,
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 50,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const connection = mongoose
  .connect(MONGO_URL)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:18 ~ CONECTADO!:");
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:20 ~ err:", err);
  });

app.use("/api/session/", sessionRoutes);
app.use("/api/private/", authMdw, (req, res) => {
  const username = req.session.user;
  console.log("🚀 ~ file: app.js:56 ~ app.use ~ username:", username);
  return res.json({
    message: `route protected, you are welcome user ${username}`,
  });
});

app.listen(PORT, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT}`);
});
