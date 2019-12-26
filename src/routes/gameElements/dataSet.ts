import { Router } from "express";

import button from "../../ReactGenerators/elements/button/Button"
import CMSController from "../../cmsDataHandler/gameElementController";
import endSessionButton from "../../ReactGenerators/elements/endSessionButton/endSessionButton";
import sessionIdText from "../../ReactGenerators/elements/sessionIdText";

const router = Router();

export interface IAnswer {
  _key: string,
  _type: "button",
  title: string,
  backgroundColor: string,
  disappears: boolean,
  trackable: boolean,
}

interface IAsteroidDataSet {
  correctAnswers: IAnswer[],
  incorrectAnswers: IAnswer[],
  quizTitle: string,
}

router.get("/dataSet", async (req, res) => {
  const dataQuery = await CMSController.fetchALLCMSData();
  const data: IAsteroidDataSet = dataQuery[0];
  const { quizTitle } = data;
  
  const correctHTMLElements = data.correctAnswers.map((answerData) => {
    return {
      html: button({
        answerData,
        quizTitle,
        correct: true,
      })
    }
  })
  const incorrectHTMLElements = data.incorrectAnswers.map((answerData) => {
    return {
      html: button({
        answerData,
        quizTitle,
        correct: false,
      })
    }
  })
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