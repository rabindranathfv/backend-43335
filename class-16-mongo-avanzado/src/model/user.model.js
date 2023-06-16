const mongoose = require("mongoose");

const collection = "Usuarios";

const schema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  age: Number,
  password: String,
  notes: {
    type: [
      {
        note: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "notas",
        },
      },
    ],
  },
});

schema.pre("find", function () {
  this.populate("notes.note");
});

const userModel = mongoose.model(collection, schema);
module.exports = userModel;
