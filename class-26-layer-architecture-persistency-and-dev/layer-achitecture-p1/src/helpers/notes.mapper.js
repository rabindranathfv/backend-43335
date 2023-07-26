const mapNotes = (notes) => {
  return notes.map((note) => {
    return {
      _id: note._id,
      title: note.title,
    };
  });
};

module.exports = {
  mapNotes,
};
