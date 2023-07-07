const jwt = require("jsonwebtoken");

const SECRET_JWT = "sup3rs3cr3t";

// await generateJWT(user)
// CONVIERTO CODIGO SINCRONO EN CODIGO ASYNCRONO
const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, SECRET_JWT, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.log("🚀 ~ file: jwt.js:10 ~ jwt.sign ~ err:", err);
        reject("can not generate token, something wrong");
      }

      resolve(token);
    });
  });
};

module.exports = {
  generateJWT,
  SECRET_JWT,
};
