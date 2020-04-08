import * as buttonFuncMount from "../functionMounters/asteroidButtonFunctions";
import timeTracker from "../gameScripts/timeTracker";

import { ISession } from "../../database/models/Session";
import { IAsteroidSessionConfig } from "../../database/models/AsteroidSessionConfig";

export default (session: ISession, ssrElement: HTMLElement, gameConfig: IAsteroidSessionConfig, canvasHeight: number) => {
  const { sessionId, lessonId } = session;

  const { asteroidSecondsToCrash } = gameConfig;
  buttonFuncMount.mountFalling(ssrElement, canvasHeight, asteroidSecondsToCrash);

  const insideButton = ssrElement.getElementsByTagName("button")[0];
  if (insideButton.getAttribute("data-type") === "button") {
    const timeTrackId = timeTracker.startTimer();

    if (insideButton.getAttribute("data-correct") === "true") {
      buttonFuncMount.mountAsteroidClick(insideButton, sessionId, timeTrackId, true, lessonId);
    } else {
      buttonFuncMount.mountAsteroidClick(insideButton, sessionId, timeTrackId, false, lessonId);
    }
  }
}