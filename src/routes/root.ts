import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("GameElementAPI is online");
});

export default router;