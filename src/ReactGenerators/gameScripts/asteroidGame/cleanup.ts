import { meteorContainerClassname } from "../../elements/meteorButton";

const removeAllAsteroids = () => {
  const endButtonCollection = document.body.getElementsByClassName(meteorContainerClassname);
  for (let i = 0; i < endButtonCollection.length; i++) {
    const endButton = endButtonCollection[i];
    endButton.remove();
  }
}

export default () => {
  removeAllAsteroids();
}