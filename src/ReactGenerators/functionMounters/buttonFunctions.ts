import axios from "axios";

import timeTracker from "../timeTracker";

// Types
import { IClickDataModel } from "../../database/models/ClickData";
import { asteroid } from "../configs/gameConfigs";

const registerClick = async (data: IClickDataModel, lessonId: string) => {
  const res = await axios.post(`http://localhost:8090/lesson/${lessonId}/session/register/buttonClick`, data);
  console.log({ sent: data, received: res });
}

export const mountClick = (
  buttonElement: HTMLElement,
  sessionId: string,
  timeTrackId: number,
  correct: boolean,
  lessonId: string,
) => {
  const question = buttonElement.getAttribute("data-question");
  if (question === null) throw new Error("buttonElement.getAttribute('data-question') is not defined");

  buttonElement.addEventListener("click", () => {
    const reactionTime = timeTracker.checkTimer(timeTrackId)
    registerClick(
      {
        correct,
        question,
        reactionTime,
        sessionId,
      },
      lessonId
    );
    const buttonContainer = buttonElement.parentNode;
    buttonContainer?.parentNode?.removeChild(buttonContainer);
  })
}

const moveDown = (buttonElement: HTMLElement, moveDownPX: number) => {
  buttonElement.style.top = (buttonElement.offsetTop + moveDownPX) + "px";
}

const checkAndRemove = (distanceToShield: number, element: HTMLElement) => {
  try {
    const topAttr = element.style.top;
    const distanceDescended = parseInt(topAttr.substr(0, topAttr.length - 2));
    if (distanceDescended >= distanceToShield - asteroid.meteorSize / 4) {
      element.parentNode?.removeChild(element);
    }
  } catch (error) {
    console.error("Error trying to extract number from element.style.top. Expected px attribute")
  }
}

export const mountFalling = (element: HTMLElement, gameHeight: number, asteroidSecondsToCrash: number) => {
  const distanceToShield = gameHeight - asteroid.shieldPositionFromBottom;
  const fallSpeed = distanceToShield / asteroidSecondsToCrash;
  const fps = 30;
  const refreshRateMS = 1000 / fps;
  const fallDelta = fallSpeed / fps;
  console.log("fallDelta: " + fallDelta);
  setInterval(() => {
    moveDown(element, fallDelta);
    checkAndRemove(distanceToShield, element);
  }, refreshRateMS);
}
