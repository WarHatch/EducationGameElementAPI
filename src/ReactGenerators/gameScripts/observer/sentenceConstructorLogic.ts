import * as selectedButtonFuncMount from "../../functionMounters/selectedButtonFunctions";
import * as selectedSlotFuncMount from "../../functionMounters/selectedSlotFunctions";
import timeTracker from "../timeTracker";

import { ISession } from "../../../database/models/Session";
import { ISentenceConstructorConfig } from "../../../database/models/SentenceConstructorConfig";

export default (session: ISession, ssrElement: HTMLElement, gameConfig: ISentenceConstructorConfig) => {
  const { sessionId, lessonId } = session;

  const timeTrackId = timeTracker.startTimer(); // TODO: might wanna start this when the game has loaded and pass it as a param

  if (ssrElement.getAttribute("role") === "contentOptionButton") {
    selectedButtonFuncMount.mountPhraseClick(ssrElement, sessionId, timeTrackId, lessonId)
  } else if (ssrElement.getAttribute("data-slotindex") !== null) {
    selectedSlotFuncMount.mountPhraseClick(ssrElement, sessionId, timeTrackId, lessonId)
  }
}