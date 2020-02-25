import { meteorContainerClassname } from "../../elements/meteorButton";

const removeAllAsteroids = (gameElement: Element) => {
  // @ts-ignore gameElement is possibly 'null'
  const endButtonCollection = gameElement.getElementsByClassName(meteorContainerClassname);
  for (let i = 0; i < endButtonCollection.length;) {
    endButtonCollection.item(i)?.remove();
  }
}

export default (gameElement: Element) => {
  removeAllAsteroids(gameElement);
}