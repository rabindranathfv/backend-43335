const jwt = require("jsonwebtoken");
const { SECRET_JWT } = require("../utils/jwt");

const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: `not Authenticated avalaible` });
  }

  try {
    // Bearer asdjhakdghkajhdgjkageiqwuetgykiqgdhkjahgdkjahsdgjkhyaw
    const token = authHeader.split(" ")[1];
    const data = jwt.verify(token, SECRET_JWT);
    req.user = {
      first_name: data.user.first_name,
      last_name: data.user.last_name,
      email: data.user.email,
      age: data.user.age,
    };

    req.token = token;
    next();
  } catch (error) {
    console.log(
      "🚀 ~ file: auth-token.middleware.js:24 ~ authToken ~ error:",
      error
    );
    return res.status(403).json({
      message: `invalid authorization, forbidden`,
    });
  }
};

module.exports = {
  authToken,
};
