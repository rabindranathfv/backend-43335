import { Router } from "express";
import productModel from "../model/product.model.js";
import ProductCtrl from "../controllers/product.controller.js";

const productsRoutes = Router();
const productCtrl = new ProductCtrl();

productsRoutes.get("/", productCtrl.getAllProducts);

productsRoutes.get("/:pId", productCtrl.getProductById);

productsRoutes.delete("/:pId", productCtrl.deleteProductById);

productsRoutes.post("/", productCtrl.createProduct);

export default productsRoutes;
