import axios from "axios";

import timeTracker from "../helpers/timeTracker";

// Types
import { IClickDataModel } from "../../database/models/ClickData";
import { asteroid } from "../gameConfigs";

const registerClick = async (data: IClickDataModel) => {
  const res = await axios.post("http://localhost:8090/gameSession/register/buttonClick", data);
  console.log({ sent: data, received: res });
}

export const mountClick = (buttonElement: HTMLElement, sessionId: string, timeTrackId: number, correct: boolean) => {
  const question = buttonElement.getAttribute("data-question");
  if (question === null) throw new Error("buttonElement.getAttribute('data-question') is not defined");

  buttonElement.addEventListener("click", () => {
    const reactionTime = timeTracker.checkTimer(timeTrackId)
    registerClick({
      correct,
      question,
      reactionTime,
      sessionId,
    })
    const buttonContainer = buttonElement.parentNode;
    buttonContainer?.parentNode?.removeChild(buttonContainer);
  })
}

const moveDown = (buttonElement: HTMLElement, moveDownPX: number) => {
  buttonElement.style.top = (buttonElement.offsetTop + moveDownPX) + "px";
}

const checkAndRemove = (element: HTMLElement) => {
  try {
    const topAttr = element.style.top;
    const topAttrValue = parseInt(topAttr.substr(0, topAttr.length - 2));
    if (topAttrValue >= asteroid.shieldPositionFromTop - asteroid.meteorSize / 2)
    {
      element.parentNode?.removeChild(element);
    }
  } catch (error) {
    console.error("Error trying to extract number from element.style.top. Expected px attribute")
  }
}

export const mountFalling = (element: HTMLElement, asteroidSecondsToCrash: number) => {  
  const fallSpeed = (asteroid.shieldPositionFromTop) / asteroidSecondsToCrash;
  const fps = 30;
  const refreshRateMS = 1000 / fps;
  const fallDelta = fallSpeed / fps;
  console.log("fallDelta: " + fallDelta);
  setInterval(() => {
    moveDown(element, fallDelta);
    checkAndRemove(element);
  }, refreshRateMS);
}
