import axios from "axios";

import timeTracker from "../trackerHelpers/timeTracker";

// Types
import { IClickDataModel } from "../../database/models/ClickData.d";

const registerClick = async (data: IClickDataModel) => {
  const res = await axios.post("http://localhost:8090/gameSession/register/buttonClick", data);
  console.log({ sent: data, received: res });
}

export const ifButtonMountClick = (buttonElement: HTMLElement, timeTrackId: number) => {
  if (buttonElement.classList.contains("SSRElement") && buttonElement.getAttribute("react-type") === "button")
    buttonElement.addEventListener("click", () => {
      const reactionTime = timeTracker.checkTimer(timeTrackId)
      registerClick({
        reactionTime,
      })
    })
}
