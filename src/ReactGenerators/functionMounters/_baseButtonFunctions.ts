import axios from "axios";
import config from "../../config";
import timeTracker from "../gameScripts/timeTracker";

// Types
import { IAsteroidClickDataModel } from "../../database/models/AsteroidClickData";
import { ISentenceConstructorClickDataModel } from "../../database/models/SentenceConstructorClickData";

const registerClick = async (data: IAsteroidClickDataModel | ISentenceConstructorClickDataModel, lessonId: string): Promise<void> => {
  const res = await axios.post(`${config.host}/lesson/${lessonId}/session/register/buttonClick`, data);
  console.log({ sent: data, received: res });
}

export const mountRegisterClick = (
  buttonElement: HTMLElement,
  lessonId: string,
  timeTrackId: number,
  registerPayload: any,
) => {
  buttonElement.addEventListener("click", () => {
    const spawnToClickTime = timeTracker.checkTimer(timeTrackId)

    const payload: IAsteroidClickDataModel | ISentenceConstructorClickDataModel = {
      ...registerPayload,
      spawnToClickTime
    };

    registerClick(
      payload,
      lessonId
    );
    const buttonContainer = buttonElement.parentNode;
    buttonContainer?.parentNode?.removeChild(buttonContainer);
  })
}
