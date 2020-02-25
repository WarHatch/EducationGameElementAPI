import { Router } from "express";

import endSessionButton from "../../ReactGenerators/elements/endSessionButton";
import questionElement from "../../ReactGenerators/elements/question";

import getCanvasDimensions from "../../ReactGenerators/configs/canvasConfigs";

const router = Router();

router.get("/dataSet/:canvasWidth", async (req, res) => {
  const { canvasWidth: canvasWidthParam } = req.params;

  const { height, width, questionWidth } = getCanvasDimensions(parseInt(canvasWidthParam));
  console.log({ height, width });

  const questionHTMLPromise = questionElement({ conteinerHeight: height, width: questionWidth });

  const endSessionHTML = {
    html: endSessionButton({})
  }

  const gameElementsDataSet = {
    gameElements: {
      endSessionHTML,
      questionHTML: await questionHTMLPromise,
    }
  }

  res.json(gameElementsDataSet);

  console.log("Game elements sent:");
  console.log(gameElementsDataSet);
});

export default router;