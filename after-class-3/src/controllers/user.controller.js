import UserService from "../dao/users.dao.js";

const userService = new UserService();

export const getUsers = async (req, res) => {
  // TODO: AGREGAR TRY CATCH
  const data = await userService.getUsers();

  return res.json({
    message: `getUsers`,
    users: data,
  });
};

export const getUserById = async (req, res) => {
  const { uid } = req.params;
  const data = await userService.getUsersById(uid);

  // TODO: si data es undefined retornar la respuesta correspondiente

  return res.json({
    message: `getUserById`,
    user: data,
  });
};

export const createUser = async (req, res) => {
  const data = await userService.createUser(req.body);

  return res.json({
    message: `createUser`,
    user: data,
  });
};

export const updateUserById = async (req, res) => {
  const { uid } = req.params;
  const uptBodyUser = req.body;
  const data = await userService.updateUserById(uid, uptBodyUser);

  // TODO: si data es undefined retornar la respuesta correspondiente

  return res.json({
    message: `updateUserById`,
    user: data,
  });
};

export const deleteUserById = async (req, res) => {
  const { uid } = req.params;
  const data = await userService.deleteUserById(uid)

  return res.json({
    message: `deleteUserById`,
    user: data
  });
};
