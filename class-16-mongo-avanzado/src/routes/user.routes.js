const { Router } = require("express");
const userModel = require("../model/user.model");
const notesModel = require("../model/notes.model");

const router = Router();

router.get("/", async (req, res) => {
  const users = await userModel.find({});
  return res.json({ message: `getAllUsers`, users });
});

router.post("/", async (req, res) => {
  try {
    const userBody = req.body;
    const newUser = await userModel.create(userBody);

    return res.json({ message: `createUser`, user: newUser });
  } catch (error) {
    console.log("🚀 ~ file: user.routes.js:18 ~ router.post ~ error:", error);
  }
});

router.get("/:userId", async (req, res) => {
  // SIRVE CON EL POPULATION
  // const userData = await userModel.find({ _id: req.params.userId });
  const userData = await userModel
    .findById({ _id: req.params.userId })
  return res.json({ message: `getUserById `, user: userData });
});

router.put("/:userId/notes/:noteId", async (req, res) => {
  const { userId, noteId } = req.params;

  const user = await userModel.findOne({ _id: userId });
  console.log("🚀 ~ file: user.routes.js:31 ~ router.put ~ user:", user);

  // TODO: sino existe el usuario mandar un error
  const note = await notesModel.findById(noteId);
  console.log("🚀 ~ file: user.routes.js:36 ~ router.put ~ note:", note);

  // AGREGANDO LA NOTA AL USUARIO
  user.notes.push({ note: noteId });

  // actualizo el usuario
  const updatedUser = await userModel.updateOne({ _id: userId }, user);

  return res.json({
    message: `add a specific note to an user`,
    updated: updatedUser,
  });
});

router.delete("/:userId", async (req, res) => {
  const deleteUser = await userModel.deleteOne({ _id: req.params.userId });
  return res.json({
    message: `deleteUserById`,
    user: deleteUser,
  });
});

module.exports = router;
