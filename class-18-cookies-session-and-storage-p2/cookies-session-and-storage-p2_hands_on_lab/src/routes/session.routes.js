const { Router } = require("express");
const userModel = require("../model/user.model");

const router = Router();

router.get("/logout", async (req, res) => {
  req.session.destroy((err) => {
    if (!err) return res.redirect("/login");
    return res.send({ message: `logout Error`, body: err });
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const session = req.session;
    console.log(
      "🚀 ~ file: session.routes.js:17 ~ router.post ~ session:",
      session
    );

    // { email: email }
    const findUser = await userModel.findOne({ email });
    console.log(
      "🚀 ~ file: session.routes.js:24 ~ router.post ~ findUser:",
      findUser
    );

    if (!findUser) {
      return res
        .status(401)
        .json({ message: "usuario no registrado/existente" });
    }

    if (findUser.password !== password) {
      return res
        .status(401)
        .json({ message: "password incorrecto" });
    }

    req.session.user = {
      ...findUser,
      password: "",
    };

    return res.render("profile", {
      last_name: req.session?.user?.last_name || findUser.last_name,
      email: req.session?.user?.email || email,
      age: req.session?.user?.age || findUser.age,
    });
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:47 ~ router.post ~ error:",
      error
    );
  }
});

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const newUser = await userModel.create(body);
    console.log(
      "🚀 ~ file: session.routes.js:58 ~ router.post ~ newUser:",
      newUser
    );

    req.session.user = { ...body };
    return res.render("login");
  } catch (error) {
    console.log(
      "🚀 ~ file: session.routes.js:66 ~ router.post ~ error:",
      error
    );
  }
});

module.exports = router;
