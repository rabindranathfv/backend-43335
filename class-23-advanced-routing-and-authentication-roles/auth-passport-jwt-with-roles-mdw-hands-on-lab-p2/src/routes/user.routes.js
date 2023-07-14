const { Router } = require("express");
const passport = require("passport");
const { passportCall } = require("../utils/jwt");
const authorization = require("../middleware/authorization.middleware");
const { roleType } = require("../model/user.model");
const userModel = require("../model/user.model");
const handlePolicies = require("../middleware/handle-policies.middleware");

const router = Router();

router.get(
  "/current",
  // passport.authenticate("jwt", { session: false }),
  [passportCall("jwt"), authorization("USER")],
  (req, res) => {
    return res.send(req.user);
  }
);

// PUBLICO
router.get("/", handlePolicies(["PUBLIC"]), async (req, res) => {
  const users = await userModel.find({});
  return res.json({ message: "list of user", users });
});

// USER, ADMINS
router.get(
  "/:uid",
  handlePolicies(["USER", "ADMIN", "GOLD", "SOLVER", "BRONCE"]),
  async (req, res) => {
    const { uid } = req.params;
    const user = await userModel.findById(uid);

    if (!user) {
      return res.status(404).json({
        message: `user ${uid} info not found`,
      });
    }

    return res.json({ message: "user info", user });
  }
);

// TODO: eso solo deberia hacerlo el ADMIN
router.delete("/:uid", handlePolicies(["BRONCE"]), async (req, res) => {
  const { uid } = req.params;
  const user = await userModel.findById(uid);

  if (!user) {
    return res.status(404).json({
      message: `user ${uid} info not found`,
    });
  }

  const userDel = await userModel.deleteOne({ id: uid });
  console.log(
    "🚀 ~ file: user.routes.js:50 ~ router.delete ~ userDel:",
    userDel
  );

  return res.json({ message: "user deleted" });
});

module.exports = router;
