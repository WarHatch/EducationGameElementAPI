import { meteorContainerClassname } from "../../elements/meteorButton";

const removeAllAsteroids = (gameHTMLCanvas: Element) => {
  const endButtonCollection = gameHTMLCanvas.getElementsByClassName(meteorContainerClassname);
  for (let i = 0; i < endButtonCollection.length;) {
    endButtonCollection.item(i)?.remove();
  }
}

export default (gameHTMLCanvas: Element) => {
  removeAllAsteroids(gameHTMLCanvas);
}