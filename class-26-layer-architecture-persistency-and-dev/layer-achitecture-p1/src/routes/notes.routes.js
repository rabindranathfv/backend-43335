const { Router } = require("express");

const { getAllNotes, createNote } = require("../controllers/notes.controller");

const router = Router();

// req, res
router.get("/", getAllNotes);

router.post("/", createNote);

module.exports = router;
