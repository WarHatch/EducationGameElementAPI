import { SCContainerClassname } from "../../observer/sentenceConstructorLogic";
import { removeCommonElements } from "../commonCleanup";

export default (gameHTMLCanvas: Element) => {
  removeAllSCContainers(gameHTMLCanvas);
}

const removeAllSCContainers = (gameHTMLCanvas: Element) => {
  const containerCollection = gameHTMLCanvas.getElementsByClassName(SCContainerClassname);
  for (let i = 0; i < containerCollection.length;) {
    containerCollection.item(i)?.remove();
  }
  removeCommonElements(gameHTMLCanvas);
}