import { Router } from "express";
import {
  createBook,
  deleteBookById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "../controllers/book.controller.js";
import { createBookDTO } from "../dto/book.dto.js";

const router = Router();

router.get("/", getAllBooks);

router.get("/:bid", getBookById);

// TODO: AGREGAR DTO EN LA CREACION DEL LIBRO
router.post("/library/:lid", createBookDTO, createBook);

router.put("/:bid", updateBookById);

router.delete("/:bid", deleteBookById);

export default router;
