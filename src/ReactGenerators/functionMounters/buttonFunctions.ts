import axios from "axios";

import timeTracker from "../trackerHelpers/timeTracker";

const registerClick = async (data) => {
  const res = await axios.post("http://localhost:8090/gameSession/register/buttonClick", data);
  console.log({ sent: data, received: res });
}

export const ifButtonMountClick = (buttonElement: HTMLElement, timeTrackId: number) => {
  if (buttonElement.classList.contains("SSRElement") && buttonElement.getAttribute("react-type") === "button")
    buttonElement.addEventListener("click", () => {
      const timeTillClick = JSON.stringify(timeTracker.checkTimer(timeTrackId))
      registerClick({
        data: {
          timeTillClick,
        }
      })
    })
}
