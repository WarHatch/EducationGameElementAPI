import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("You have reached GameElementAPI!");
});

export default router;