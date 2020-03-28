import * as buttonFuncMount from "../../functionMounters/buttonFunctions";
import timeTracker from "../timeTracker";

import { ISession } from "../../../database/models/Session";
import { ISentenceConstructorConfig } from "../../../database/models/SentenceConstructorConfig";

export interface ISCGlobal {
  attemptedAnswer: {
    selected: string | null;
    correctPlacement: number | null;
  }
}

export default (session: ISession, ssrElement: HTMLElement, gameConfig: ISentenceConstructorConfig) => {
  const { sessionId, lessonId } = session;

  // Init additional global state
  window.sentenceConstructorParams = {
    attemptedAnswer: {
      selected: null,
      correctPlacement: null,
    }
  }

  // const insideButton = ssrElement.getElementsByTagName("button")[0];
  // if (insideButton.getAttribute("data-type") === "button") {
  //   const timeTrackId = timeTracker.startTimer();

  //   if (insideButton.getAttribute("data-correct") === "true") {
  //     buttonFuncMount.mountClick(insideButton, sessionId, timeTrackId, true, lessonId);
  //   } else {
  //     buttonFuncMount.mountClick(insideButton, sessionId, timeTrackId, false, lessonId);
  //   }
  // }
}