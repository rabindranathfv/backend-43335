import { Router } from "express";
import twilio from "twilio";
import { SMS_ACC_SID, SMS_AUTH_TOKEN, SMS_PHONE } from "../config/config.js";

const router = Router();

const client = twilio(SMS_ACC_SID, SMS_AUTH_TOKEN);

router.post("/send", async (req, res) => {
  let result = await client.messages.create({
    body: `envio a ${req.body.name} por su cumpleanos numero ${req.body.age}, que la pases bien`,
    from: SMS_PHONE,
    to: req.body.phone,
  });
  console.log("🚀 ~ file: sms.routes.js:15 ~ router.post ~ result:", result);

  res.send({ ok: true, result: `sms send to ${req.body.phone}` });
});

export default router;
