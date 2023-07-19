const { Router } = require("express");
const notesModel = require("../model/notes.model");
const isValidMongoId = require("../middleware/is-valid-mongo-id.middleware");
const handlePolicies = require("../middleware/handle-policies.middleware");
const { ExtractJwt } = require("passport-jwt");

const router = Router();

router.get("/", handlePolicies(["USER"]), async (req, res) => {
  try {
    const notes = await notesModel.find({});
    return res.json({ message: `getAllNotes`, notes });
  } catch (error) {
    console.log("🚀 ~ file: notes.routes.js:10 ~ router.get ~ error:", error);
  }
});

router.get(
  "/:noteId",
  [isValidMongoId("noteId"), handlePolicies(["USER"])],
  async (req, res) => {
    const { noteId } = req.params;

    const noteInfo = await notesModel.findById({ _id: noteId });

    if (!noteInfo) {
      return res.status(404).json({ message: `not found note` });
    }

    return res.json({ message: `getNoteById`, note: noteInfo });
  }
);

router.post("/", handlePolicies(["USER", "ADMIN"]), async (req, res) => {
  // TODO: Reciben la info del usuario por la autenticacion con JWT, crean la nota y luego la relacionan
  console.log("USER DATA FROM JWT", req.user);

  const bodyNotes = req.body;
  if (!bodyNotes.title && !bodyNotes.content) {
    return res.status(400).json({ message: `bad parameters in body` });
  }

  const newNote = await notesModel.create(bodyNotes);

  // TODO: relacionar con el usuario
  const { id } = req.user?.user;
  console.log("🚀 ~ file: notes.routes.js:47 ~ router.post ~ id:", id);

  return res.json({ message: `createNote`, note: newNote });
});

// TODO: Hacer metodo PUT
router.put(
  "/:noteId",
  [isValidMongoId("noteId"), handlePolicies(["USER"])],
  async (req, res) => {
    // TODO: VALIDAR QUIEN CREO LA NOTA COMO EJERCICIO Y SI EL MISMO QUE LA VA MODIFICAR
  }
);

router.delete(
  "/:noteId",
  [isValidMongoId("noteId"), handlePolicies(["ADMIN"])],
  async (req, res) => {
    const { noteId } = req.params;

    const noteDel = await notesModel.deleteOne({ _id: noteId });

    if (!noteDel.deletedCount) {
      return res.status(404).json({ message: `doesn't exist this note` });
    }

    return res.json({
      message: `note delete sucessfully ${noteId}`,
    });
  }
);

module.exports = router;
