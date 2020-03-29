import * as selectedButtonFuncMount from "../../functionMounters/selectedButtonFunctions";
import * as selectedSlotFuncMount from "../../functionMounters/selectedSlotFunctions";
import timeTracker from "../timeTracker";

import { ISession } from "../../../database/models/Session";
import { ISentenceConstructorConfig } from "../../../database/models/SentenceConstructorConfig";

export default (session: ISession, ssrElement: HTMLElement, gameConfig: ISentenceConstructorConfig) => {
  const { sessionId, lessonId } = session;

  const insideButton = ssrElement.getElementsByTagName("button")[0];

  if (insideButton.getAttribute("data-type") === "button") {
    const timeTrackId = timeTracker.startTimer(); // TODO: might wanna start this when the game has loaded and pass it as a param

    // if (insideButton.getAttribute("data-correct") === "true") {
    //   buttonFuncMount.mountClick(insideButton, sessionId, timeTrackId, true, lessonId);
    // }
  }
}