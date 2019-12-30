console.log("server script received");

import { v1 } from "uuid";

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"

import asteroidButtons from "../elements/meteorButton";
import * as buttonFuncMount from "../functionMounters/buttonFunctions";
import * as endFuncMount from "../functionMounters/endSessionFunctions";
import { startSession } from "../helpers/sessionManager";
import timeTracker from "../helpers/timeTracker";
import { defaultSessionConfig } from "../constants";
import { ISession } from "../../database/models/Session.d";
import { ISessionConfig } from "../../database/models/SessionConfig";
import Axios from "axios";

interface IAsteroidElements {
  correctHTMLElements,
  incorrectHTMLElements
}

const htmlToElement = (html: string) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
}

const spawnAsteroid = ({
  correctHTMLElements,
  incorrectHTMLElements
}) => {
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

  document.getElementById("game")
  // FIXME: adding elements based on loose logic
  .getElementsByTagName("div")[0]
    .appendChild(newNode);
}

const applyAsteroidConfig = (
  config: ISessionConfig,
  asteroidButtons: IAsteroidElements
) => {
  const { asteroidSpawnPerMinute } = config;

  const spawnTimeout = 60 * 1000 / asteroidSpawnPerMinute;
  const intervalSpawn = setInterval(() => {
    spawnAsteroid(asteroidButtons);
  }, spawnTimeout);

  return intervalSpawn;
}

const uuid = v1();

startSession({
  sessionId: uuid,
  finishedAt: null,
  sessionConfigs: [{
    sessionId: uuid,
    ...defaultSessionConfig,
  }]
}).then(async (session) => {
  const { sessionConfigs } = session;
  // FIXME: assumes last item is latest
  let latestConfig = sessionConfigs[sessionConfigs.length - 1];

  const asteroidElements = await asteroidButtons();

  // --- Initial setup
  // spawnAsteroid(asteroidElements);
  let appliedSpawnInterval = applyAsteroidConfig(latestConfig, asteroidElements)

  // --- Dynamic config setup
  const configRefreshInterval = 1000;
  setInterval(async () => {
    // get new config
    const configResponse = await Axios.post("http://localhost:8090/gameSession/config",
      { sessionId: uuid }
    );
    const receivedConfig = configResponse.data;
    // if different config than used now
    if (latestConfig.asteroidSpawnPerMinute !== receivedConfig.asteroidSpawnPerMinute)
    {
      latestConfig = receivedConfig;
      // remove old intervals
      clearInterval(appliedSpawnInterval);
      // apply new config
      appliedSpawnInterval = applyAsteroidConfig(latestConfig, asteroidElements)
    }
  }, configRefreshInterval)
})

const observerOptions = {
  childList: true,
  attributes: false,
  subtree: true //Omit or set to false to observe only changes to the parent node.
};
let observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Mutation Detected: ");
    
    // Overwriting mutations Node type
    mutation.addedNodes.forEach((newNode: HTMLElement) => {
      if (newNode.classList.contains("SSRElement")) {
        console.log(newNode)
        const ssrElement: HTMLElement = newNode;

        if (newNode.classList.contains("MeteorContainer")) {
          buttonFuncMount.mountFalling(ssrElement);
          buttonFuncMount.mountRemoveAfter(ssrElement);

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
if (!targetNode) console.error("observe target node not found");
observer.observe(targetNode, observerOptions);

console.log("server script finished");