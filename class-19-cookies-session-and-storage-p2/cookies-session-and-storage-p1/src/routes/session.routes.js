import { Router } from "express";

const router = Router();

router.get("/login", async (req, res) => {
  const { username, password, email } = req.body;

  if (username !== "rabin" || password !== "123456") {
    return res.json({ message: "login fallido" });
  }

  req.session["user"] = username;
  req.session.admin = true;
  req.session.email = email;
  return res.json({
    message: "login success",
  });
});

router.get("/logout", async (req, res) => {
  const name = req.session.user;
  console.log(`Sesion de ${name}`);

  req.session.destroy((err) => {
    if (!err) return res.json({ message: `logout successfully` });
    return res.send({ message: `logout Error`, body: err });
  });
});

router.get("/welcome", async (req, res) => {
  const { name } = req.query;

  console.log("ENTRANDO Y CREANDO SESION***", name);

  const counter = req.session?.counter;
  if (!counter) {
    req.session.counter = 1;
    req.session.user = name;
    req.session.admin = true;
    return res.send(`Te damos la bienvenida ${name}`);
  }

  // CREO Y ESCRIBO EN LA SESSION, similar a new Session(name, true, 1)
  req.session.user = name;
  req.session.admin = true;
  req.session.counter++;
  return res.send(
    `has ingresado ${name} exitosamente, unas ${req.session.counter} veces`
  );
});

export default router;
