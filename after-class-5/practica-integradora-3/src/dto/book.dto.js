import { body } from "express-validator";
import { mappingValidateMdw } from "../middleware/mapping.validation.middleware.js";

export const createBookDTO = [
  body("title").notEmpty().withMessage("title Is Required"),
  body("author").notEmpty().withMessage("author Is Required"),
  body("genre").notEmpty().withMessage("genre Is Required"),
  body("publicationYear")
    .notEmpty()
    .withMessage("publicationYear is required")
    .isInt()
    .withMessage("publication year must be a number")
    .custom((value) => value > 1000)
    .withMessage(" publication year must be after 1000 years"),
  mappingValidateMdw,
];
