const { isValidObjectId } = require("mongoose");

const isValidMongoId = (paramsId) => {
  return (req, res, next) => {
    const urlId = req.params[`${paramsId}`];
    const url = req.originalUrl;
    if (!isValidObjectId(urlId)) {
      return res.status(400).json({ message: `bad request on URL ${url}` });
    }

    next();
  };
};

module.exports = isValidMongoId;
