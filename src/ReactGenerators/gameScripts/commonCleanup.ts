import { countdownContainerClassname } from "../elements/countdownTimer";

export const removeCommonElements = (gameHTMLCanvas: Element) => {
  const commonElementClassnames = [countdownContainerClassname]

  commonElementClassnames.forEach(classname => {
    const elementCollection = gameHTMLCanvas.getElementsByClassName(classname);
    for (let i = 0; i < elementCollection.length;) {
      elementCollection.item(i)?.remove();
    }
  });
}