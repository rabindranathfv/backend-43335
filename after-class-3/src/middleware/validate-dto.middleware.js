function validateSchema(schema) {
  return (req, res, next) => {
    const bodyDto = req.body;

    const { error } = schema.validate(bodyDto, { abortEarly: false });
    if (error) {
      const validationError = error.details.map((detail) => {
        return detail.message;
      });
      return res
        .status(400)
        .json({ message: `BAD_REQUEST`, errors: validationError });
    }

    next();
  };
}

export default validateSchema;
