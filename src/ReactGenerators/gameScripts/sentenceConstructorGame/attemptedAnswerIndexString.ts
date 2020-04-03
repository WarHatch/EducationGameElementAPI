import { getHTMLCanvasElement } from "../HTMLCanvasManager"

export default () => {
  const htmlCanvasElement = getHTMLCanvasElement();
  const attemptedAnswersImageCollection = htmlCanvasElement.querySelectorAll("[data-attemptedanswer]");

  let answerIndexString = "";
  for (let i = 0; i < attemptedAnswersImageCollection.length; i++) {
    const answerIndex = attemptedAnswersImageCollection[i].attributes.getNamedItem("data-attemptedanswer")?.value;
    answerIndexString += String(answerIndex) + " ";
  }
  return answerIndexString;
}