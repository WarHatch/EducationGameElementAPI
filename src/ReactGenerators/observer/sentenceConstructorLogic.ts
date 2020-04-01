import * as selectedButtonFuncMount from "../functionMounters/selectedButtonFunctions";
import * as selectedSlotFuncMount from "../functionMounters/selectedSlotFunctions";
import * as hintButtonFunctions from "../functionMounters/hintButtonFunctions";
import timeTracker from "../gameScripts/timeTracker";

import { ISession } from "../../database/models/Session";
import { ISentenceConstructorConfig } from "../../database/models/SentenceConstructorConfig";
import { storyTextContainerClassname } from "../elements/storyTextWithSlots";
import { popupCardClassname, cardCloseButtonClassname } from "../elements/popupCardElement";
import { hintButtonClassname } from "../elements/hintButton";

export const SCContainerClassname = "SSR-SConstructorContainer";

export default (session: ISession, ssrElement: Element, gameConfig: ISentenceConstructorConfig) => {
  const { sessionId, lessonId } = session;

  const timeTrackId = timeTracker.startTimer(); // TODO: wanna start this when the game has loaded and pass it as a param

  // if contentOption button
  if (ssrElement.getAttribute("role") === "contentOptionButton") {
    selectedButtonFuncMount.mountPhraseClick(ssrElement as HTMLElement, sessionId, timeTrackId, lessonId)
  }
  // if storyText container
  else if (ssrElement.getAttribute("class")?.includes(storyTextContainerClassname)) {
    const slotButtons = ssrElement.getElementsByTagName("button");
    for (let i = 0; i < slotButtons.length; i++) {
      const slotButton = slotButtons[i];
      selectedSlotFuncMount.mountPhraseClick(slotButton, sessionId, timeTrackId, lessonId)
    }
  }
  // If hint button appeared
  else if (ssrElement.getAttribute("class")?.includes(hintButtonClassname)) {
    hintButtonFunctions.mountClick(ssrElement, sessionId, lessonId);
  }
  else {
    console.warn("unhandled observed mutation");
    console.warn(ssrElement);
  }
}