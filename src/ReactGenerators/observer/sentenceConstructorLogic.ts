import * as selectedButtonFuncMount from "../functionMounters/selectedButtonFunctions";
import * as selectedSlotFuncMount from "../functionMounters/selectedSlotFunctions";
import * as hintButtonFunctions from "../functionMounters/hintButtonFunctions";
import timeTracker from "../gameScripts/timeTracker";

import { ISession } from "../../database/models/Session";
import { ISentenceConstructorConfig } from "../../database/models/SentenceConstructorConfig";
import { storyTextContainerClassname } from "../elements/storyTextWithSlots";
import { popupCardClassname, cardCloseButtonClassname } from "../elements/popupCardElement";
import { hintButtonClassname } from "../elements/hintButton";
import { completedButtonClassname, mountCompleteClick } from "../elements/scCompletedButton";

export const SCContainerClassname = "SSR-SConstructorContainer";

export default (session: ISession, scContainerElement: Element, gameConfig: ISentenceConstructorConfig, gameStartTimerId: number) => {
  const { sessionId, lessonId } = session;

  // if contentOption button
  if (scContainerElement.getAttribute("role") === "contentOptionButton") {
    selectedButtonFuncMount.mountPhraseClick(scContainerElement as HTMLElement, sessionId, gameStartTimerId, lessonId)
  }
  // if storyText container
  else if (scContainerElement.getAttribute("class")?.includes(storyTextContainerClassname)) {
    const slotButtons = scContainerElement.getElementsByTagName("button");
    for (let i = 0; i < slotButtons.length; i++) {
      const slotButton = slotButtons[i];
      selectedSlotFuncMount.mountPhraseClick(slotButton, sessionId, gameStartTimerId, lessonId)
    }
  }
  // If hint button appeared
  else if (scContainerElement.getAttribute("class")?.includes(hintButtonClassname)) {
    hintButtonFunctions.mountClick(scContainerElement, sessionId, lessonId);
  }
  // If complete button appeared
  else if (scContainerElement.getAttribute("class")?.includes(completedButtonClassname)) {
    const { nextContentSlug } = gameConfig;
    mountCompleteClick(scContainerElement as HTMLElement, sessionId, lessonId, gameStartTimerId, nextContentSlug,
      window.htmlCanvas as IHTMLCanvasConfig)
  }
  else {
    console.warn("unhandled observed mutation");
    console.warn(scContainerElement);
  }
}