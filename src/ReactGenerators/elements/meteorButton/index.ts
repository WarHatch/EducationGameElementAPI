import button from "./meteorButton"
import Axios, { AxiosResponse } from "axios";

export interface IAnswer {
  _key: string,
  _type: "button",
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

export default async () => {
  const dataQuery: AxiosResponse<IAsteroidDataSet> = await Axios.get("http://localhost:8090/gameElements/cms");
  const { data } = dataQuery;
  const { quizTitle, correctAnswers, incorrectAnswers } = data[0];

  const correctHTMLElements = correctAnswers.map((answerData) => {
    return {
      html: button({
        answerData,
        quizTitle,
        correct: true,
      })
    }
  })
  const incorrectHTMLElements = incorrectAnswers.map((answerData) => {
    return {
      html: button({
        answerData,
        quizTitle,
        correct: false,
      })
    }
  })

  return {
    correctHTMLElements,
    incorrectHTMLElements,
  }
}
