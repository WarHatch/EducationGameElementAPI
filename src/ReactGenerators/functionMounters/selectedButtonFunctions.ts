import { registerSCClick } from "../dataHandler";
import timeTracker from "../gameScripts/timeTracker";
import { ISentenceConstructorClickDataModel } from "../../database/models/SentenceConstructorClickData";

export const mountPhraseClick = (
  buttonElement: HTMLElement, // atributes: data-correctplacement
  sessionId: string,
  timeTrackId: number,
  lessonId: string,
) => {
  buttonElement.addEventListener("click", () => {
    const spawnToClickTime = timeTracker.checkTimer(timeTrackId)

    const correctPlacement = buttonElement.getAttribute("data-correctplacement");
    const attemptedAnswerLabel = buttonElement.getAttribute("aria-label");
    const attemptedAnswerImgSrc = buttonElement.firstElementChild?.getAttribute("src");

    if (attemptedAnswerLabel === null) throw new Error("attribute 'aria-label' is not defined on button element");
    if (attemptedAnswerImgSrc === null || attemptedAnswerImgSrc === undefined)
      throw new Error("attribute 'src' is not defined on button's firstElementChild");

    // @ts-ignore safe to assume sentenceConstructorParams is defined
    window.sentenceConstructorParams
      .attemptedAnswer = {
      selected: attemptedAnswerLabel,
      correctPlacement: correctPlacement ? Number(correctPlacement) : null,
      src: attemptedAnswerImgSrc,
    }

    const payload: ISentenceConstructorClickDataModel = {
      sessionId,
      attemptedAnswer: attemptedAnswerLabel,
      attemptedSlotNumber: null,
      correct: null,
      spawnToClickTime
    };

    registerSCClick(payload, lessonId);
  });
}