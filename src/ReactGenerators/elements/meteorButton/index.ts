import button from "./meteorButton"
import Axios, { AxiosResponse } from "axios";
import { ISessionConfig } from "../../../database/models/SessionConfig";

export interface IAnswer {
  _key: string,
  _type: "button", //TODO: see if this field HAS to be used
  title: string,
  backgroundColor: string,
  disappears: boolean,
  trackable: boolean,
}

export interface IAsteroidDataSet {
  correctAnswers: IAnswer[],
  incorrectAnswers: IAnswer[],
  quizTitle: string,
}

interface Props {
  canvasWidth: number,
  questionWidth: number,
}

export default async (props: Props) => {
  const { canvasWidth, questionWidth } = props;

  const dataQuery: AxiosResponse<IAsteroidDataSet> = await Axios.get("http://localhost:8090/gameElements/cms");
  const { data } = dataQuery;
  const { quizTitle, correctAnswers, incorrectAnswers } = data[0];

  const imageSize = 230;
  const asteroidXPosition = canvasWidth - questionWidth - imageSize/2;
  const randXPosition = () => questionWidth + Math.floor(Math.random() * asteroidXPosition) + "px";

  const correctHTMLElements = correctAnswers.map((answerData) => {
    const xPosition = randXPosition();
    return {
      html: button({
        answerData,
        correct: true,
        quizTitle,
        xPosition,
      })
    }
  })
  const incorrectHTMLElements = incorrectAnswers.map((answerData) => {
    return {
      html: button({
        answerData,
        correct: false,
        quizTitle,
        xPosition: randXPosition(),
      })
    }
  })

  return {
    correctHTMLElements,
    incorrectHTMLElements,
  }
}
