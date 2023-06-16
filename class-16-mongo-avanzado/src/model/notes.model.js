const { Schema, model } = require("mongoose");

const collection = "notas";

const schema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
});

const notesModel = model(collection, schema);
module.exports = notesModel;
