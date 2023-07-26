const notesService = require("../servicios/notes.service");

const getAllNotes = async (req, res) => {
  try {
    const notes = await notesService.getAllNotes();
    return res.json({ message: `getAllNotes`, notes });
  } catch (error) {
    console.error(error);
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: ` BAD REQUEST` });
    }
    const newNote = await notesService.createNote(req.body);
    return res.json({ message: `createNote`, note: newNote });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  getAllNotes,
  createNote,
};
