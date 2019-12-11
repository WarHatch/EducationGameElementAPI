console.log("server script received");

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"

import * as functionMount from "../functionMounters/buttonFunctions";

import timeTracker from "../trackerHelpers/timeTracker";

let observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Mutation Detected: ");
    // Overwriting mutations Node type
    mutation.addedNodes.forEach((newNode) => {
      console.log(newNode)
      const timeTrackId = timeTracker.startTimer();
      // @ts-ignore
      functionMount.ifButtonMountClick(newNode, timeTrackId);
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