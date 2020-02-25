import { meteorContainerClassname } from "../../elements/meteorButton";

const removeAllAsteroids = () => {
  // @ts-ignore gameElement is possibly 'null'
  const endButtonCollection = document.querySelector("#game").getElementsByClassName(meteorContainerClassname);
  for (let i = 0; i < endButtonCollection.length;) {
    endButtonCollection.item(i)?.remove();
  }
}

export default () => {
  removeAllAsteroids();
}