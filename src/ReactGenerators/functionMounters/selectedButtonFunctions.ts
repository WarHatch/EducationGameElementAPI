import { mountRegisterClick } from "./_baseButtonFunctions";

export const mountPhraseClick = (
  buttonElement: HTMLElement, // atributes: data-correctplacement
  sessionId: string,
  timeTrackId: number,
  lessonId: string,
) => {
  const correctPlacement = buttonElement.getAttribute("data-correctplacement");
  const attemptedAnswer = buttonElement.getAttribute("ariaLabel");
  if (attemptedAnswer === null) throw new Error("attribute 'ariaLabel' is not defined on button element");

  window.sentenceConstructorParams = {
    ...window.sentenceConstructorParams,
    attemptedAnswer: {
      selected: attemptedAnswer,
      correctPlacement: correctPlacement ? Number(correctPlacement) : null,
    }
  }

  mountRegisterClick(buttonElement, lessonId, timeTrackId, {
    sessionId,
    attemptedAnswer,
    attemptedSlotNumber: null,
    correct: null,
  });
}