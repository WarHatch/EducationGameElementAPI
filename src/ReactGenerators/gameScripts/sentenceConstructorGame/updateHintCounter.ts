import { hintCounterClassname } from "../../elements/hintButton";
import { getHTMLCanvasElement } from "../HTMLCanvasManager";

export default (hintCount: number) => {
  const htmlCanvas = getHTMLCanvasElement();
  const counters = htmlCanvas.getElementsByClassName(hintCounterClassname);

  for (let i = 0; i < counters.length; i++) {
    const counter = counters[i];
    counter.innerHTML = String(hintCount);
  }
}
