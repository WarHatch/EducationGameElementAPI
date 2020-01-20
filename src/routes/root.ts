import { Router } from "express";

import getCanvasDimensions from "../ReactGenerators/configs/canvasConfigs";

const router = Router();

router.get("/", (req, res) => {
  res.send("GameElementAPI is online");
});

router.get("/canvasConfig/:windowWidth", async (req, res) => {
  const { windowWidth: windowWidthParam } = req.params;

  try {
    const canvasDimensions = getCanvasDimensions(parseInt(windowWidthParam));

    res.status(200).json(canvasDimensions);
  } catch (error) {
    console.log(error);
    return res.status(400).send();
  }
});

export default router;