console.log("server script received");

import { v1 } from "uuid";

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"

import * as buttonFuncMount from "../functionMounters/buttonFunctions";
import * as endFuncMount from "../functionMounters/endSessionFunctions";
import { startSession } from "../helpers/sessionManager";
import timeTracker from "../helpers/timeTracker";

const uuid = v1();

startSession({
  callbackAddress: "placeholder",
  sessionId: uuid,
  finishedAt: null,
})

const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true //Omit or set to false to observe only changes to the parent node.
};
let observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Mutation Detected: ");
    // Overwriting mutations Node type
    mutation.addedNodes.forEach((newNode: HTMLElement) => {
      if (newNode.classList.contains("SSRElement")) {
        console.log(newNode)
        const buttonElement: HTMLElement = newNode;

        if (newNode.getAttribute("data-type") === "button") {
          const timeTrackId = timeTracker.startTimer();
          if (buttonElement.getAttribute("data-correct") === "true") {
            buttonFuncMount.mountClick(buttonElement, uuid, timeTrackId, true);
          } else {
            buttonFuncMount.mountClick(buttonElement, uuid, timeTrackId, false);
          }

          // TODO: uncomment these mounts
          // functionMount.mountFalling(buttonElement);

          // functionMount.mountRemoveAfter(buttonElement);
        }
        else if (newNode.getAttribute("data-type") === "end-button") {
          endFuncMount.mountClick(buttonElement, uuid)
        }
      }
    });
  }
});
const targetNode = document.getElementById("game")
if (!targetNode) console.error("observe target node not found");
observer.observe(targetNode, observerOptions);

console.log("server script finished");