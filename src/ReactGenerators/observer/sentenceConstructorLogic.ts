import * as selectedButtonFuncMount from "../functionMounters/selectedButtonFunctions";
import * as selectedSlotFuncMount from "../functionMounters/selectedSlotFunctions";
import timeTracker from "../gameScripts/timeTracker";

import { ISession } from "../../database/models/Session";
import { ISentenceConstructorConfig } from "../../database/models/SentenceConstructorConfig";
import { storyTextContainerClassname } from "../elements/storyTextWithSlots";

export const SCContainerClassname = "SSR-SConstructorContainer";

export default (session: ISession, ssrElement: Element, gameConfig: ISentenceConstructorConfig) => {
  const { sessionId, lessonId } = session;

  const timeTrackId = timeTracker.startTimer(); // TODO: might wanna start this when the game has loaded and pass it as a param

  if (ssrElement.getAttribute("role") === "contentOptionButton") {
    selectedButtonFuncMount.mountPhraseClick(ssrElement as HTMLElement, sessionId, timeTrackId, lessonId)
  }
  else if (ssrElement.getAttribute("class")?.includes(storyTextContainerClassname)) {
    const slotButtons = ssrElement.getElementsByTagName("button");
    for (let i = 0; i < slotButtons.length; i++) {
      const slotButton = slotButtons[i];
      selectedSlotFuncMount.mountPhraseClick(slotButton, sessionId, timeTrackId, lessonId)
    }
  }
}