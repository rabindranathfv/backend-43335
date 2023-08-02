import mongoose from "mongoose";
import { PERSISTENCE } from "../config/config.js";

const DB_HOST = "localhost";
const DB_PORT = 27017;
const DB_NAME = "layerArchitectureDB3";

const MONGO_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

export let Products;

switch (PERSISTENCE) {
  case "MONGO":
    console.log(`PERSISTENCE ${PERSISTENCE}`);
    const connection = mongoose
      .connect(MONGO_URL)
      .then((conn) => {
        console.log("🚀 ~ file: factory.js:17 ~ CONECTADO!:");
      })
      .catch((err) => {
        console.log("🚀 ~ file: factory.js:20 ~ err:", err);
      });
    const { default: ProductServiceDao } = await import(
      "../repository/product.repository.js"
    );
    console.log(
      "🚀 ~ file: factory.js:24 ~ ProductServiceDao:",
      ProductServiceDao
    );
    Products = ProductServiceDao;
    break;

  default:
    // TODO: In memory, crear y exportar el respectivo Dao en Memoria
    console.log(`PERSISTENCE ${PERSISTENCE}`);
    const { default: ProductServiceDao2 } = await import(
      "../repository/product.repository.js"
    );
    console.log(
      "🚀 ~ file: factory.js:36 ~ ProductServiceDao2:",
      ProductServiceDao2
    );
    Products = ProductServiceDao2;
    break;
}
