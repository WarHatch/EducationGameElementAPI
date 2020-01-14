console.log("server script received");

// Assets need to be imported to be bundled
import "./gameElementsStylesheet.css"
import "./assets/meteor.png"
import "./assets/shield_line.png"

import { startSession } from "../helpers/sessionManager";
import htmlToElement from "../helpers/htmlToElement";

import asteroidButtons from "../elements/meteorButton";
import observeSSRElements from "./observer";
import { gameDimensions } from "../canvasConfigs";
import { ISessionConfig } from "../../database/models/SessionConfig";
import Axios from "axios";
import shieldImage from "../elements/shieldImage";
import { asteroid } from "../gameConfigs";
import { ISession } from "../../database/models/Session";

interface IAsteroidElements {
  correctHTMLElements,
  incorrectHTMLElements
}

const appendToCanvas = (element: ChildNode) => {
  const gameElement = document.querySelector("#game");
  // FIXME: adding elements based on loose logic
  // @ts-ignore
  const gameCanvas = gameElement.lastChild
  // @ts-ignore
  gameCanvas.appendChild(element);
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

  appendToCanvas(newNode);
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


//@ts-ignore
if (!!(window.session) === false) {
  throw new Error("window.session is falsy");
}
//@ts-ignore handled above
const session: ISession = window.session;
const { sessionId, lessonId } = session;
console.log(session);
//@ts-ignore handled below 
let currentConfig: ISessionConfig = session.sessionConfigs[0];
if (currentConfig === undefined) {
  throw new Error("sessionConfig is undefined");
}

// --- Initial setup
// const asteroidElements = await asteroidButtons(gameDimensions);
asteroidButtons(gameDimensions).then((asteroidElements) => {
  let currentSpawnInterval = applyAsteroidConfig(currentConfig, asteroidElements)
  let currentObserver = observeSSRElements(sessionId, currentConfig)

  appendToCanvas(htmlToElement(shieldImage()));

  // --- Periodically check for config changes
  const configRefreshInterval = 1000;
  setInterval(async () => {
    // get new config
    const configResponse = await Axios.post(`http://localhost:8090/lesson/${lessonId}/session/config`,
      { sessionId }
    );
    const receivedConfig = configResponse.data;
    // if received different config DTO than the current
    if (JSON.stringify(currentConfig) !== JSON.stringify(receivedConfig)) {
      currentConfig = receivedConfig;
      // remove old intervals
      clearInterval(currentSpawnInterval);
      // apply new intervals
      currentSpawnInterval = applyAsteroidConfig(currentConfig, asteroidElements)

      // Disconnect old observer
      currentObserver.disconnect();
      // Setup SSR element observer with new config
      currentObserver = observeSSRElements(sessionId, currentConfig)
    }
  }, configRefreshInterval)
});

console.log("server script finished");