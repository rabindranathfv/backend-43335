const userModel = require("../model/user.model");
class UserService {
  userModel;
  constructor() {
    this.userModel = userModel;
  }

  getAllUsers = async () => {
    const users = await userModel.find();
    return users;
  };
}

module.exports = UserService;
