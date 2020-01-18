import axios from "axios";
import endSessionSplash from "../elements/endSessionSplash";
import htmlToElement from "../public/code/htmlToElement";

import { appendToGame } from "../public/SSRScript";

// Types
type IEndSessionData = {
  sessionId: string,
  finishedAt: Date,
}

const endSessionClick = async (lessonId: string, data: IEndSessionData) => {
  const res = await axios.post(`http://localhost:8090/lesson/${lessonId}/session/register/end`, data);
  console.log({ sent: data, received: res });
}

export const mountClick = (buttonElement: HTMLElement, sessionId: string, lessonId: string) => {
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
