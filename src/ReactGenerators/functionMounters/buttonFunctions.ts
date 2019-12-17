import axios from "axios";

import timeTracker from "../trackerHelpers/timeTracker";

// Types
import { IClickDataModel } from "../../database/models/ClickData.d";

const registerClick = async (data: IClickDataModel) => {
  const res = await axios.post("http://localhost:8090/gameSession/register/buttonClick", data);
  console.log({ sent: data, received: res });
}

const moveDown = (buttonElement: HTMLElement, moveDownPX: number) => {
  buttonElement.style.top = (buttonElement.offsetTop + moveDownPX) + "px";
}

export const mountClick = (buttonElement: HTMLElement, timeTrackId: number) => {
    buttonElement.addEventListener("click", () => {
      const reactionTime = timeTracker.checkTimer(timeTrackId)
      registerClick({
        reactionTime,
      })
    })
}

export const mountFalling = (buttonElement: HTMLElement) => {
    const refreshRateMS = 10;
    setInterval(() => {
      moveDown(buttonElement, 2);
    }, refreshRateMS);
}

export const mountRemoveAfter = (buttonElement: HTMLElement) => {
  setTimeout(() => {
    buttonElement.parentNode.removeChild(buttonElement);
  }, 2000);
}
