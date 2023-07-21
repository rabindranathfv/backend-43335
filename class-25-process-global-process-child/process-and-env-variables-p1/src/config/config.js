const { config } = require("dotenv");

config({
  path: `.env.${process.env.NODE_ENV || "development"}.local`,
});

console.log(
  "config LOAD ENVIROMENT***",
  `.env.${process.env.NODE_ENV || "development"}`
);

module.exports = {
  CURSO: process.env.CURSO,
  PORT: process.env.PORT,
};
