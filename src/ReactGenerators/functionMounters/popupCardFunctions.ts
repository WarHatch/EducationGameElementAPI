import { } from "../dataHandler";
import timeTracker from "../gameScripts/timeTracker";

export const mountCloseClick = (
  buttonElement: Element,
  // timeTrackId: number,
  // lessonId: string,
  buttonContainer: Element,
) => {
  buttonElement.addEventListener("click", () => {
    // const spawnToClickTime = timeTracker.checkTimer(timeTrackId)

    // const payload: IAsteroidClickDataModel = {
    //   sessionId, question, correct,
    //   spawnToClickTime
    // };
    // registerAsteroidClick(payload, lessonId);

    buttonContainer?.parentNode?.removeChild(buttonContainer);
  });
}

export const dissapearAfterFiveSeconds = (buttonElement: Element) => {
  setTimeout(() => {
    buttonElement.remove();
  }, 5000)
}