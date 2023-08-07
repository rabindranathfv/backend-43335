import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById,
} from "../controllers/user.controller.js";
import validateSchema from "../middleware/validate-dto.middleware.js";
import userSchemaDto from "../dto/user.dto.js";

const router = Router();

router.get("/", getUsers);

router.get("/:uid", getUserById);

router.post("/",[validateSchema(userSchemaDto)],createUser);

router.put("/:uid", updateUserById);

router.delete("/:uid", deleteUserById);

export default router;
