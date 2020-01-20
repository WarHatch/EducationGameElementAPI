console.log("server script received");

// Assets need to be imported to be bundled
import "./gameElementsStylesheet.css"
import "./assets/meteor.png"
import "./assets/shield_line.png"


import Axios from "axios";
import observeSSRElements from "./code/observer";
import htmlToElement from "./code/htmlToElement";
import getCanvasDimensions from "../configs/canvasConfigs";

import asteroidButtons from "../elements/meteorButton";
import shieldImage from "../elements/shieldImage";
import endSessionSplash from "../elements/endSessionSplash";
import endSessionButton from "../elements/endSessionButton";

import { ISession } from "../../database/models/Session";
import { ISessionConfig } from "../../database/models/SessionConfig";

interface IAsteroidElements {
  correctHTMLElements,
  incorrectHTMLElements
}

export const appendToGame = (element: ChildNode) => {
  const gameElement = document.querySelector("#game");
  if (gameElement == null) throw new Error("div element with id \"game\" is missing");
  // @ts-ignore // FIXME: assumed that "html canvas" element is present
  const gameHTMLCanvas: Element = gameElement.firstChild;
  gameHTMLCanvas.appendChild(element);
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

  appendToGame(newNode);
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


declare global {
  interface Window {
    session?: ISession | null;
    gameEnded: boolean;
  }
}

if (window.session === undefined || window.session === null) {
  throw new Error("window.session is falsy");
}
const { session } = window;
const { sessionId, lessonId } = session;
console.log(session);
//@ts-ignore handled below 
let currentConfig: ISessionConfig = session.sessionConfigs[0];
if (currentConfig === undefined) {
  throw new Error("sessionConfig is undefined");
}

// --- Initial setup
window.gameEnded = false;
const canvasWidth = getCanvasDimensions(window.innerWidth).width;
asteroidButtons({
  canvasWidth
})
  .then((asteroidElements) => {
    let currentSpawnInterval = applyAsteroidConfig(currentConfig, asteroidElements)
    let currentObserver = observeSSRElements(sessionId, currentConfig, lessonId)

    // One-time elements
    appendToGame(htmlToElement(shieldImage({canvasWidth})));
    appendToGame(htmlToElement(endSessionButton({})));

    // --- Periodically check for config changes
    const configRefreshInterval = 1000;
    setInterval(async () => {
      // @ts-ignore // FIXME: check for ended game in a different loop
      if (window.gameEnded) {
        clearInterval(currentSpawnInterval);
      }
      else {
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
          currentObserver = observeSSRElements(sessionId, currentConfig, lessonId)
        }
      }
    }, configRefreshInterval)
  });

console.log("server script finished");