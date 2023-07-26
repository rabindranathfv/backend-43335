const mongoose = require("mongoose");

const collection = "notas";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const notesModel = mongoose.model(collection, schema);
module.exports = notesModel;
