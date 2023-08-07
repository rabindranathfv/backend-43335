import { Router } from "express";
import { createOrder, deleteOrderById, getOrderById, getOrders, updateOrderById } from "../controllers/orders.controller.js";
import validateSchema from "../middleware/validate-dto.middleware.js";
import orderSchemaDto from "../dto/order.dto.js";

const router = Router();

router.get("/", getOrders);

router.get("/:oid", getOrderById);

router.post("/", validateSchema(orderSchemaDto), createOrder);

router.put("/:oid", updateOrderById);

router.delete("/:oid", deleteOrderById);

export default router;
