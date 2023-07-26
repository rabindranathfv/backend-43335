const UserService = require("../servicios/user.service");

class UserController {
  userService;
  constructor() {
    this.userService = new UserService();
  }

  getAllUsers = async (req, res) => {
    const users = await this.userService.getAllUsers();
    return res.json({ message: `getAllUsers`, users });
  };
}

module.exports = UserController;
