const { Router } = require("express");
const notesModel = require("../model/notes.model");

const router = Router();

router.get("/", async (req, res) => {
  // Select * from nombre_tabla
  const notes = await notesModel.find({});
  return res.json({ message: `getALLnotes`, notes });
});

router.post("/", async (req, res) => {
  try {
    const noteBody = req.body;
    // TODO: VALIDAR EL BODY DE ENTRADA
    const newnote = await notesModel.create(noteBody);

    return res.json({ message: `createnote`, note: newnote });
  } catch (error) {
    console.log("🚀 ~ file: notes.routes.js:20 ~ router.post ~ error:", error);
  }
});

router.get("/:noteId", async (req, res) => {
  const noteData = await notesModel.findById({ _id: req.params.noteId });
  return res.json({ message: `getnoteById `, note: noteData });
});

router.delete("/:noteId", async (req, res) => {
  const deletenote = await notesModel.deleteOne({ _id: req.params.noteId });
  return res.json({
    message: `deletenoteById`,
    note: deletenote,
  });
});

module.exports = router;
