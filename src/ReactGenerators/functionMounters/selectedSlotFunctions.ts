import { registerSCClick } from "../dataHandler";
import { ISentenceConstructorClickDataModel } from "../../database/models/SentenceConstructorClickData";
import timeTracker from "../gameScripts/timeTracker";

export const mountPhraseClick = (
  buttonElement: HTMLElement, // aria-label, className, data-slotindex
  sessionId: string,
  timeTrackId: number,
  lessonId: string,
) => {
  buttonElement.addEventListener("click", () => {
    const spawnToClickTime = timeTracker.checkTimer(timeTrackId)

    const slotIndex = Number(buttonElement.getAttribute("data-slotindex"));
    const attemptedAnswer = window.sentenceConstructorParams?.attemptedAnswer;
    
    if (slotIndex === null) throw new Error("attribute 'data-slotindex' is not defined on button element");
    if (attemptedAnswer !== null && attemptedAnswer !== undefined) {
      const { selected, correctPlacement, src } = attemptedAnswer;

      // registerClick whether attemptedAnswer is null or not
      const payload: ISentenceConstructorClickDataModel = {
        sessionId,
        attemptedAnswer: selected,
        attemptedSlotNumber: slotIndex,
        correct: correctPlacement !== null ? correctPlacement === slotIndex : false,
        spawnToClickTime
      };
      registerSCClick(payload, lessonId);

      // add image when answer is placed into a slot
      const imgElement = buttonElement.firstElementChild; // assumes image will be first
      if (imgElement === null)
        throw new Error("Unable to get firstElementChild of button");
      imgElement.setAttribute("src", src)
      imgElement.setAttribute("data-attemptedanswer", String(correctPlacement !== null ? correctPlacement : "-1"))
    } else {
      console.warn("attemptedAnswer was not yet defined");
    }
  });
}