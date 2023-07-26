const { Router } = require("express");
const UserController = require("../controllers/user.controller");

const router = Router();

const userController = new UserController();

// req, res
router.get("/", userController.getAllUsers);

module.exports = router;
