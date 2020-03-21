import * as buttonFuncMount from "../functionMounters/buttonFunctions";
import * as endFuncMount from "../functionMounters/endSessionFunctions";
import timeTracker from "./timeTracker";

import { ISessionConfig } from "../../database/models/SessionConfig";
import { ISession } from "../../database/models/Session";
import { endButtonClassName } from "../elements/endSessionButton";

const observerOptions = {
  attributes: false,
  childList: true,
  subtree: true,
};

export default (session: ISession, gameConfig: ISessionConfig, canvasConfig: { canvasHeight: number; }) => {
  const { sessionId, lessonId } = session;
  const { canvasHeight } = canvasConfig;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Overwriting mutations Node type
      mutation.addedNodes.forEach((newNode: HTMLElement) => {
        if (newNode.classList.contains("SSRElement")) {
          const ssrElement: HTMLElement = newNode;
          // Asteroid game logic
          if (ssrElement.classList.contains("SSR-MeteorContainer")) {
            const { asteroidSecondsToCrash } = gameConfig;
            buttonFuncMount.mountFalling(ssrElement, canvasHeight, asteroidSecondsToCrash);

            const insideButton = ssrElement.getElementsByTagName("button")[0];
            if (insideButton.getAttribute("data-type") === "button") {
              const timeTrackId = timeTracker.startTimer();

              if (insideButton.getAttribute("data-correct") === "true") {
                buttonFuncMount.mountClick(insideButton, sessionId, timeTrackId, true, lessonId);
              } else {
                buttonFuncMount.mountClick(insideButton, sessionId, timeTrackId, false, lessonId);
              }
            }
          }
          else if (ssrElement.classList.contains(endButtonClassName)) {
            endFuncMount.mountClick(ssrElement, sessionId, lessonId);
          }
          // else if (newNode.getAttribute("data-type") === "sessionId-text") {
          //   newNode.innerText = "session Id: " + sessionId;
          // }
        }
      });
    }
  });

  const targetNode = document.getElementById("game")
  if (targetNode === null) throw new Error("observe target node not found");
  observer.observe(targetNode, observerOptions);

  return observer;
}; 
