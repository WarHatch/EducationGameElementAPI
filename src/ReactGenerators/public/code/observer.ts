import * as buttonFuncMount from "../../functionMounters/buttonFunctions";
import * as endFuncMount from "../../functionMounters/endSessionFunctions";
import timeTracker from "../../timeTracker";
import { ISessionConfig } from "../../../database/models/SessionConfig";

const observerOptions = {
  attributes: false,
  childList: true,
  subtree: true //Omit or set to false to observe only changes to the parent node.
};

export default (uuid: string, config: ISessionConfig) => {
  let observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      console.log("Mutation Detected: ");

      // Overwriting mutations Node type
      mutation.addedNodes.forEach((newNode: HTMLElement) => {
        if (newNode.classList.contains("SSRElement")) {
          console.log(newNode)
          const ssrElement: HTMLElement = newNode;

          if (newNode.classList.contains("SSR-MeteorContainer")) {
            const { asteroidSecondsToCrash } = config;
            buttonFuncMount.mountFalling(ssrElement, asteroidSecondsToCrash);

            const insideButton = newNode.getElementsByTagName("button")[0];
            if (insideButton.getAttribute("data-type") === "button") {
              const timeTrackId = timeTracker.startTimer();

              if (insideButton.getAttribute("data-correct") === "true") {
                buttonFuncMount.mountClick(insideButton, uuid, timeTrackId, true);
              } else {
                buttonFuncMount.mountClick(insideButton, uuid, timeTrackId, false);
              }
            }
          }
          else if (newNode.getAttribute("data-type") === "end-button") {
            endFuncMount.mountClick(ssrElement, uuid)
          }
          else if (newNode.getAttribute("data-type") === "sessionId-text") {
            newNode.innerText = "session Id: " + uuid;
          }
        }
      });
    }
  });

  const targetNode = document.getElementById("game")
  if (targetNode === null) throw new Error("observe target node not found");
  observer.observe(targetNode, observerOptions);

  return observer;
}; 