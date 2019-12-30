import axios from "axios";

import timeTracker from "../helpers/timeTracker";
import { gameDimensions } from "../constants";

// Types
import { IClickDataModel } from "../../database/models/ClickData.d";

const registerClick = async (data: IClickDataModel) => {
  const res = await axios.post("http://localhost:8090/gameSession/register/buttonClick", data);
  console.log({ sent: data, received: res });
}

const moveDown = (buttonElement: HTMLElement, moveDownPX: number) => {
  buttonElement.style.top = (buttonElement.offsetTop + moveDownPX) + "px";
}

export const mountClick = (buttonElement: HTMLElement, sessionId: string, timeTrackId: number, correct: boolean) => {
  const question = buttonElement.getAttribute("data-question");

  buttonElement.addEventListener("click", () => {
    const reactionTime = timeTracker.checkTimer(timeTrackId)
    registerClick({
      correct,
      question,
      reactionTime,
      sessionId,
    })
  })
}

export const mountRemoveAfter = (element: HTMLElement, asteroidSecondsToCrash: number) => {
  setTimeout(() => {
    element.parentNode.removeChild(element);
  }, asteroidSecondsToCrash * 1000);
}

export const mountFalling = (element: HTMLElement, asteroidSecondsToCrash: number) => {
  console.log(asteroidSecondsToCrash);
  
  const fallSpeed = (gameDimensions.height * 0.8) / asteroidSecondsToCrash;
  const fps = 30;
  const refreshRateMS = 1000 / fps;
  const fallDelta = fallSpeed / fps;
  // console.log(fallDelta);
  setInterval(() => {
    moveDown(element, fallDelta);
  }, refreshRateMS);
}
