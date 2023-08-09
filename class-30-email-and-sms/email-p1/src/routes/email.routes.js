import { Router } from "express";
import nodemailer from "nodemailer";
import { EMAIL, PSW_EMAIL } from "../config/config.js";

const router = Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  user: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: PSW_EMAIL,
  },
});

router.post("/send", async (req, res) => {
  try {
    let result = await transporter.sendMail({
      FROM: EMAIL,
      to: req.body.email,
      subject: `sending email with nodemail and Gmail as provider`,
      html: `
      <div>
        <h1>Esto es un email de prueba</h1>
        <img src="cid:loro" />
      </div>
      `,
      attachments: [
        {
          filename: "pet-loro.png",
          path: `${process.cwd()}` + `/public/img/pet-loro.png`,
          cid: "loro",
        },
        {
          filename: "ejercicios.pdf",
          path: `${process.cwd()}` + `/public/file/ejercicios.pdf`,
        },
        {
          filename: "pet-loro.png",
          path: `${process.cwd()}` + `/public/img/pet-loro.png`,
        },
      ],
    });
    console.log(
      "🚀 ~ file: email.routes.js:32 ~ router.post ~ result:",
      result
    );

    return res.send({ ok: true, message: `email send to ${req.body.email}` });
  } catch (error) {
    console.log("🚀 ~ file: email.routes.js:36 ~ router.post ~ error:", error);
  }
});

export default router;
