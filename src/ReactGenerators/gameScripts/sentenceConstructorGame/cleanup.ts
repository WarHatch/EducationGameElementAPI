import { SCContainerClassname } from "../../observer/sentenceConstructorLogic";

export default (gameHTMLCanvas: Element) => {
  removeAllSCContainers(gameHTMLCanvas);
}

const removeAllSCContainers = (gameHTMLCanvas: Element) => {
  const containerCollection = gameHTMLCanvas.getElementsByClassName(SCContainerClassname);
  for (let i = 0; i < containerCollection.length;) {
    containerCollection.item(i)?.remove();
  }
}