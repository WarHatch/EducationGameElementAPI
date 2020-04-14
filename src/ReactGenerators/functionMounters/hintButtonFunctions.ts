import popupCardElement from "../elements/popupCardElement";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame } from "../gameScripts/HTMLCanvasManager";
import updateHintCounter from "../gameScripts/sentenceConstructorGame/updateHintCounter";

export const mountClick = (buttonElement: Element, sessionId: string, lessonId: string) => {
  buttonElement.addEventListener("click", () => {
    const hintMessage = window.sentenceConstructorParams?.hintCollector.unreadMessageStack.pop();
    updateHintCounter(window.sentenceConstructorParams?.hintCollector.unreadMessageStack.length as number)
    if (hintMessage !== undefined) {
      // const now = new Date();
      // endSessionClick(
      //   lessonId,
      //   {
      //     finishedAt: now,
      //     sessionId,
      //   },
      // )

      appendToGame(htmlToElement(popupCardElement({
        cardText: hintMessage,
        exitable: true,
        dissapearAfterFiveSeconds: false
      })));
    }
  })
}
