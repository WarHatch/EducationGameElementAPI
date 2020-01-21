import button from "./meteorButton";
import { getCMSData } from "../../dataHandler";

interface Props {
  canvasWidth: number,
  questionWidth: number,
}

export default async (props: Props) => {
  const { canvasWidth, questionWidth } = props;

  const { quizTitle, correctAnswers, incorrectAnswers } = await getCMSData();

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
