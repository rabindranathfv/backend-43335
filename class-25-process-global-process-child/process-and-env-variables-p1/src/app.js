const { CURSO, PORT } = require("./config/config");

console.log(
  `ENVIROMENT ${process.env.NODE_ENV}, CURSO: ${CURSO}, PORT: ${PORT}`
);
