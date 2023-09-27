import LibraryDao from "../dao/library.dao.js";

const libraryService = new LibraryDao();

export const getAllLibraries = async (req, res) => {
  try {
    const libraries = await libraryService.getAllLibraries();
    return res.json({
      message: `getAllLibraries OK`,
      libraries,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: library.controller.js:14 ~ getAllLibraries ~ error:",
      error
    );
  }
};

export const getLibraryById = async (req, res) => {
  try {
    const { lid } = req.params;
    const data = await libraryService.getLibraryById(lid);

    return res.json({
      message: `getLibraryById OK with id: ${lid}`,
      library: data,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: library.controller.js:30 ~ getLibraryById ~ error:",
      error
    );
  }
};

export const createLibrary = async (req, res) => {
  try {
    const library = req.body;

    const newLibrary = await libraryService.createLibrary(library);
    return res.json({
      message: `create library OK`,
      library: newLibrary,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: library.controller.js:35 ~ createLibrary ~ error:",
      error
    );
  }
};

export const updateLibraryById = async (req, res) => {
  try {
    const { lid } = req.params;
    const libBody = req.body;
    console.log(
      "🚀 ~ file: library.controller.js:58 ~ updateLibraryById ~ libBody:",
      libBody
    );
    const libraryUpd = await libraryService.updateLibraryById(lid, libBody);
    // TODO: SI FALLA MANDAR UN ERROR

    return res.json({
      message: `updateLibraryById OK with id: ${lid}`,
      library: libraryUpd,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: library.controller.js:61 ~ updateLibraryById ~ error:",
      error
    );
  }
};

export const deletelibraryById = async (req, res) => {
  try {
    const { lid } = req.params;
    const libraryDel = await libraryService.deletelibraryById(lid);
    // TODO: SI FALLA MANDAR UN ERROR

    return res.json({
      message: `deletelibraryById OK with id: ${lid}`,
      library: libraryDel,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: library.controller.js:81 ~ deletelibraryById ~ error:",
      error
    );
  }
};
