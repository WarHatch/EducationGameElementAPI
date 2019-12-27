import CMSController from "../../../cmsDataHandler/gameElementController";
import button from "./Button"

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

  return {
    correctHTMLElements,
    incorrectHTMLElements,
  }
}
