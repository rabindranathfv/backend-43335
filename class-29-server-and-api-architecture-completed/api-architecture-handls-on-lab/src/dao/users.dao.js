import userModel from "../model/user.model.js";

export default class UserDao {
  getUsers = async () => {
    try {
      const data = await userModel.find();
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: users.dao.js:9 ~ UserDao ~ getUsers= ~ error:",
        error
      );
      return null;
    }
  };

  getUserById = async (uid) => {
    try {
      const data = await userModel.findOne({ _id: uid });
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: users.dao.js:22 ~ UserDao ~ getUserById= ~ error:",
        error
      );
      return null;
    }
  };

  createUser = async (user) => {
    try {
      const data = await userModel.create(user);
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: users.dao.js:35 ~ UserDao ~ createUsersers= ~ error:",
        error
      );
      return null;
    }
  };

  updateUserById = async (uid, user) => {
    try {
      const data = await userModel.updateOne({ _id: uid }, { $set: user });
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: users.dao.js:48 ~ UserDao ~ updateUserById= ~ error:",
        error
      );
      return null;
    }
  };

  deleteUserById = async (uid) => {
    try {
      const data = await userModel.deleteOne({ _id: uid });
      return data;
    } catch (error) {
      console.log(
        "🚀 ~ file: users.dao.js:58 ~ UserDao ~ deleteUserById ~ error:",
        error
      );
      return null;
    }
  };
}
