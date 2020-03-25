import * as buttonFuncMount from "../../functionMounters/buttonFunctions";
import timeTracker from "../timeTracker";

import { ISession } from "../../../database/models/Session";
import { ISentenceConstructorConfig } from "../../../database/models/SentenceConstructorConfig";

export default (session: ISession, ssrElement: HTMLElement, gameConfig: ISentenceConstructorConfig) => {
  const { sessionId, lessonId } = session;

  // const insideButton = ssrElement.getElementsByTagName("button")[0];
  // if (insideButton.getAttribute("data-type") === "button") {
  //   const timeTrackId = timeTracker.startTimer();

  //   if (insideButton.getAttribute("data-correct") === "true") {
  //     buttonFuncMount.mountClick(insideButton, sessionId, timeTrackId, true, lessonId);
  //   } else {
  //     buttonFuncMount.mountClick(insideButton, sessionId, timeTrackId, false, lessonId);
  //   }
  // }
}