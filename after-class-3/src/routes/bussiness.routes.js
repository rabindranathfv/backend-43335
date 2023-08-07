import { Router } from "express";
import {
  createBussiness,
  deleteBussinessById,
  getBussiness,
  getBussinessById,
  updateBussinessById,
} from "../controllers/bussiness.controller.js";
import validateSchema from "../middleware/validate-dto.middleware.js";
import bussinessSchemaDto from "../dto/bussiness.dto.js";

const router = Router();

router.get("/", getBussiness);

router.get("/:bid", getBussinessById);

router.post("/", [validateSchema(bussinessSchemaDto)], createBussiness);

router.put("/:bid", updateBussinessById);

router.delete("/:bid", deleteBussinessById);

export default router;
