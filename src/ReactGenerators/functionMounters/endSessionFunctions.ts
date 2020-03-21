import axios from "axios";
import endSessionSplash from "../elements/endSessionSplash";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame } from "../gameScripts/HTMLCanvasManager";
import config from "../../config";

// Types
type IEndSessionData = {
  sessionId: string,
  finishedAt: Date,
}

const endSessionClick = async (lessonId: string, data: IEndSessionData): Promise<void> => {
  const res = await axios.post(`${config.host}/lesson/${lessonId}/session/register/end`, data);
  console.log({ sent: data, received: res });
}

export const mountClick = (buttonElement: Element, sessionId: string, lessonId: string) => {
  buttonElement.addEventListener("click", () => {
    const now = new Date();
    endSessionClick(
      lessonId,
      {
        finishedAt: now,
        sessionId,
      },
    )
    appendToGame(htmlToElement(endSessionSplash({})));
    window.gameEnded = true;
  })
}
