const { Router } = require("express");
const passport = require("passport");
const { passportCall } = require("../utils/jwt");
const authorization = require("../middleware/authorization.middleware");
const { roleType } = require("../model/user.model");

const router = Router();

router.get(
  "/current",
  // passport.authenticate("jwt", { session: false }),
  [passportCall("jwt"), authorization("USER")],
  (req, res) => {
    return res.send(req.user);
  }
);

module.exports = router;
