import { Router } from "express";

import CMSController from "../../cmsDataHandler/gameElementController";

import asteroidButtons from "../../ReactGenerators/elements/button";
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

router.get("/cms", async (req, res) => {
  const data = await CMSController.fetchALLCMSData();

  res.json(data);
});

export default router;