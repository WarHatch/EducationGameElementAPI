console.log("server script received");

import { v1 } from "uuid";

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"

import asteroidButtons from "../../ReactGenerators/elements/button";
import * as buttonFuncMount from "../functionMounters/buttonFunctions";
import * as endFuncMount from "../functionMounters/endSessionFunctions";
import { startSession } from "../helpers/sessionManager";
import timeTracker from "../helpers/timeTracker";
import { defaultSessionConfig } from "../constants";

const htmlToElement = (html: string) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const spawnAsteroids = ({ correctHTMLElements, incorrectHTMLElements }) => {
  const spawnCorrect = Math.floor(Math.random() * 2) == 0;

  let htmlElementToSpawn;
  if (spawnCorrect) {
    const htmlElementToSpawnIndex = Math.floor(Math.random() * correctHTMLElements.length);
    htmlElementToSpawn = correctHTMLElements[htmlElementToSpawnIndex].html;
  } else {
    const htmlElementToSpawnIndex = Math.floor(Math.random() * incorrectHTMLElements.length);
    htmlElementToSpawn = incorrectHTMLElements[htmlElementToSpawnIndex].html;
  }
  const newNode = htmlToElement(htmlElementToSpawn);

  document.getElementById("game").appendChild(newNode);
}

const uuid = v1();

startSession({
  sessionId: uuid,
  finishedAt: null,
  sessionConfigs: [{
    sessionId: uuid,
    ...defaultSessionConfig,
  }]
})

// meteor spawn game setup
asteroidButtons().then(({ correctHTMLElements, incorrectHTMLElements }) => {
  const spawnPerMinute = 30;
  const spawnTimeout = 60 * 1000 / spawnPerMinute;
  setInterval(() => {
    spawnAsteroids({ correctHTMLElements, incorrectHTMLElements });
  }, spawnTimeout);
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

          buttonFuncMount.mountFalling(buttonElement);

          buttonFuncMount.mountRemoveAfter(buttonElement);
        }
        else if (newNode.getAttribute("data-type") === "end-button") {
          endFuncMount.mountClick(buttonElement, uuid)
        }
        else if (newNode.getAttribute("data-type") === "sessionId-text") {
          newNode.innerText = "session Id: " + uuid;
        }
      }
    });
  }
});
const targetNode = document.getElementById("game")
if (!targetNode) console.error("observe target node not found");
observer.observe(targetNode, observerOptions);

console.log("server script finished");