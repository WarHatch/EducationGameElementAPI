console.log("server script received");

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"

import * as functionMount from "../functionMounters/buttonFunctions";

import timeTracker from "../helpers/timeTracker";

let observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Mutation Detected: ");
    // Overwriting mutations Node type
    mutation.addedNodes.forEach((newNode: HTMLElement) => {
      if (newNode.classList.contains("SSRElement") && newNode.getAttribute("data-type") === "button") {
        console.log(newNode)
        const buttonElement: HTMLElement = newNode;
        // Prep data by attributes
        // if (buttonElement.getAttribute())

        const timeTrackId = timeTracker.startTimer();
        functionMount.mountClick(buttonElement, timeTrackId);

        // TODO: uncomment these mounts
        // functionMount.mountFalling(buttonElement);

        // functionMount.mountRemoveAfter(buttonElement);
      }
    });
  }
});
const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true //Omit or set to false to observe only changes to the parent node.
};
const targetNode = document.getElementById("game")
if (!targetNode) console.error("target node not found");
observer.observe(targetNode, observerOptions);

console.log("server script finished");