import { Router } from "express";

import asteroidButtons from "../../ReactGenerators/elements/meteorButton";
import endSessionButton from "../../ReactGenerators/elements/endSessionButton/endSessionButton";
import sessionIdText from "../../ReactGenerators/elements/sessionIdText";

const router = Router();

router.get("/dataSet", async (req, res) => {
  const { correctHTMLElements, incorrectHTMLElements } = await asteroidButtons();

  const endSessionHTML = {
      html: endSessionButton()
  }
  const sessionIdHTML = {
    html: sessionIdText()
  }

  const gameElementsDataSet = {
    // id: data._id
    gameElements: {
      correctHTMLElements,
      incorrectHTMLElements,
      endSessionHTML,
      sessionIdHTML,
    }
  }

  res.json(gameElementsDataSet);
  
  console.log("Game elements sent:");
  console.log(gameElementsDataSet);
});

export default router;