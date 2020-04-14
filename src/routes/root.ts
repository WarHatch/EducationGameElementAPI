import { Router } from "express";

const router = Router({mergeParams: true});

router.get("/", (req, res) => {
  res.send("GameElementAPI is online");
});

export default router;