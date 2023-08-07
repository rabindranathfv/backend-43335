import express from "express";
import cookieParser from "cookie-parser";
import displayRoutes from "express-routemap";
import cors from "cors";
import { connect } from "mongoose";
import { PORT } from "./config/config.js";

import userRoutes from "./routes/users.routes.js";
import bussinesRoutes from "./routes/bussiness.routes.js";
import ordersRoutes from "./routes/orders.routes.js";

const app = express();

const PORT_APP = PORT || 5005;
const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "layerArchitectureAfter3";

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);

connect(MONGO_URL)
  .then((conn) => {
    console.log("🚀 ~ file: app.js:26 ~ CONECTADO!:");
  })
  .catch((err) => {
    console.log("🚀 ~ file: app.js:29 ~ err:", err);
  });

// CREACION DE LAS RUTAS
app.use("/api/users", userRoutes);
app.use("/api/bussiness", bussinesRoutes);
app.use("/api/orders", ordersRoutes);

app.listen(PORT_APP, () => {
  displayRoutes(app);
  console.log(`Listening on ${PORT_APP}`);
});
