import axios from "axios";

import timeTracker from "../helpers/timeTracker";

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
      reactionTime,
      sessionId,
      correct,
      question,
    })
  })
}

export const mountFalling = (element: HTMLElement) => {
  const refreshRateMS = 20;
  setInterval(() => {
    moveDown(element, 1);
  }, refreshRateMS);
}

export const mountRemoveAfter = (element: HTMLElement) => {
  setTimeout(() => {
    element.parentNode.removeChild(element);
  }, 12000);
}
