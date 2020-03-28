import { mountRegisterClick } from "./_baseButtonFunctions";

export const mountPhraseClick = (
  buttonElement: HTMLElement, // atributes: ???
  sessionId: string,
  timeTrackId: number,
  lessonId: string,
) => {
  const slotIndex = Number(buttonElement.getAttribute("data-slotindex"));
  if (slotIndex === null) throw new Error("attribute 'data-slotindex' is not defined on button element");

  // @ts-ignore assume `attemptedAnswer` was initialized
  const { selected, correctPlacement } = window.sentenceConstructorParams.attemptedAnswer;

  mountRegisterClick(buttonElement, lessonId, timeTrackId, {
    sessionId,
    attemptedAnswer: selected,
    attemptedSlotNumber: slotIndex,
    correct: correctPlacement ? correctPlacement === slotIndex : false,
  });
}