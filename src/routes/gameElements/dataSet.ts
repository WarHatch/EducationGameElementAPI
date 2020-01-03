import { Router } from "express";

import asteroidButtons from "../../ReactGenerators/elements/meteorButton";
import endSessionButton from "../../ReactGenerators/elements/endSessionButton";
import sessionIdText from "../../ReactGenerators/elements/sessionIdText";
import questionElement from "../../ReactGenerators/elements/question";
import { gameDimensions } from "../../ReactGenerators/canvasConfigs";

const router = Router();

router.get("/dataSet", async (req, res) => {
  const questionHTMLPromise = questionElement();
  const { correctHTMLElements, incorrectHTMLElements } = await asteroidButtons(gameDimensions);

  const endSessionHTML = {
    html: endSessionButton()
  }
  const sessionIdHTML = {
    html: sessionIdText()
  }

  // TODO: rename to gameTypeData
  const gameElementsDataSet = {
    gameElements: {
      endSessionHTML,
      questionHTML: await questionHTMLPromise,
      sessionIdHTML,

      correctHTMLElements,
      incorrectHTMLElements,
    }
  }

  res.json(gameElementsDataSet);

  console.log("Game elements sent:");
  console.log(gameElementsDataSet);
});

export default router;