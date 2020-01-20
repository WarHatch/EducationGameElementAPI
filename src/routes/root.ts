import { Router } from "express";

import getCanvasDimensions from "../ReactGenerators/configs/canvasConfigs";

const router = Router();

router.get("/", (req, res) => {
  res.send("GameElementAPI is online");
});

router.get("/canvasConfig/:canvasWidth", async (req, res) => {
  const { canvasWidth: canvasWidthParam } = req.params;

  try {
    const canvasConfig = getCanvasDimensions(parseInt(canvasWidthParam));

    res.status(200).json(canvasConfig);
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
});

export default router;