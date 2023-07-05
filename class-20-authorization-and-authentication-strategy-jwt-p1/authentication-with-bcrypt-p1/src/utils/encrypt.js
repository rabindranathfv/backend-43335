const bcrypt = require("bcrypt");

const createHashValue = async (val) => {
  const salt = await bcrypt.genSalt();
  return await bcrypt.hashSync(val, salt);
};

const isValidPasswd = async (psw, encryptedPsw) => {
  return await bcrypt.compareSync(psw, encryptedPsw);
};

module.exports = {
  createHashValue,
  isValidPasswd,
};
