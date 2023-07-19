const { Router } = require("express");
const userModel = require("../model/user.model");
const isValidMongoId = require("../middleware/is-valid-mongo-id.middleware");
const handlePolicies = require("../middleware/handle-policies.middleware");

const router = Router();

router.get("/", handlePolicies(["ADMIN", "USER"]), async (req, res) => {
  const users = await userModel.find({});
  return res.json({ message: `getAllUsers`, users });
});

router.get(
  "/:uId",
  [isValidMongoId("uId"), handlePolicies(["ADMIN", "USER"])],
  async (req, res) => {
    const { uId } = req.params;
    const userData = await userModel
      .findById({ _id: uId })
      .populate("notes.note");

    return res.json({ message: ` getUserById `, user: userData });
  }
);

// TODO: Actualiar usuario
router.put("/:uId", isValidMongoId, async (req, res) => {});

router.delete(
  "/:uId",
  [isValidMongoId, handlePolicies(["ADMIN"])],
  async (req, res) => {
    const { uId } = req.params;
    const userDel = await userModel.deleteOne({ _id: uId });

    if (!userDel.deletedCount) {
      return res.status(404).json({ message: `doesn't exist this user` });
    }

    return res.json({
      message: `user delete sucessfully ${uId}`,
    });
  }
);

// RELACIONANDO NOTAS CON UN USUARIO
router.post(
  "/:uId/notes/:noteId",
  [isValidMongoId("uId"), isValidMongoId("noteId"), handlePolicies(["ADMIN"])],
  async (req, res) => {
    const { uId, noteId } = req.params;
    const userData = await userModel.findById({ _id: uId });
    console.log("🚀 ~ file: user.routes.js:43 ~ userData:", userData);

    userData.notes.push({ note: noteId });

    const updateUserNote = await userModel.updateOne({ _id: uId }, userData);
    console.log(
      "🚀 ~ file: user.routes.js:48 ~ updateUserNote:",
      updateUserNote
    );

    return res.json({ message: `nota relacionada exitosamente` });
  }
);

module.exports = router;
