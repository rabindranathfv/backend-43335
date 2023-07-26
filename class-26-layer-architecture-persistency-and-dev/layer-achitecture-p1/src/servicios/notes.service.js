const { mapNotes } = require("../helpers/notes.mapper");
const notesModel = require("../model/notes.model");

const getAllNotes = async () => {
  // TODO: Agregar try catch
  const notes = await notesModel.find();
  return notes?.length ? mapNotes(notes) : notes;
};

const createNote = async (note) => {
  // TODO: Agregar try catch
  const newNote = await notesModel.create(note);

  return newNote;
};

module.exports = {
  getAllNotes,
  createNote,
};
