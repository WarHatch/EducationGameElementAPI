import { Router } from "express";

import asteroidButtons from "../../ReactGenerators/elements/meteorButton";
import endSessionButton from "../../ReactGenerators/elements/endSessionButton";
import questionElement from "../../ReactGenerators/elements/question";

import getCanvasDimensions from "../../ReactGenerators/configs/canvasConfigs";

const router = Router();

router.get("/dataSet/:canvasWidth", async (req, res) => {
  const { canvasWidth: canvasWidthParam } = req.params;

  const { height, width, questionWidth } = getCanvasDimensions(parseInt(canvasWidthParam));
  console.log({ height, width });

  const questionHTMLPromise = questionElement({ conteinerHeight: height, width: questionWidth });
  // TODO: atm answer elements aren't used so unnecesarry generation is removed
  // const { correctHTMLElements, incorrectHTMLElements } = await asteroidButtons({ canvasWidth: width });

  const endSessionHTML = {
    html: endSessionButton({})
  }

  const gameElementsDataSet = {
    gameElements: {
      endSessionHTML,
      questionHTML: await questionHTMLPromise,

      // correctHTMLElements,
      // incorrectHTMLElements,
    }
  }

  res.json(gameElementsDataSet);

  console.log("Game elements sent:");
  console.log(gameElementsDataSet);
});

export default router;