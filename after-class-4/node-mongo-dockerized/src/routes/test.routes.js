import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: `desarrolando con docker en tiempo real` });
});

export default router;
