const mongoose = require("mongoose");

const collection = "Usuarios";

const schema = new mongoose.Schema({
  first_name: String,
  email: String,
  age: Number,
});

const userModel = mongoose.model(collection, schema);
module.exports = userModel;
