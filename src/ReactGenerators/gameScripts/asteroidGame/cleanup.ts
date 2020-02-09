import { meteorContainerClassname } from "../../elements/meteorButton";

const removeAllAsteroids = () => {
  // @ts-ignore gameElement is possibly 'null'
  const endButtonCollection = document.querySelector("#game").getElementsByClassName(meteorContainerClassname);
  for (let i = 0; i < endButtonCollection.length; i++) {
    const endButton = endButtonCollection[i];
    endButton.remove();
  }
}

export default () => {
  removeAllAsteroids();
}