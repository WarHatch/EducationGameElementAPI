console.log("server script received");

// Assets need to be imported to be bundled
import "./gameElementsStylesheet.css"
import "./assets/meteor.png"
import "./assets/shield_line.png"

import observeSSRElements from "./code/observer";
import htmlToElement from "./code/htmlToElement";
import getCanvasDimensions from "../configs/canvasConfigs";
import { mountClick } from "../functionMounters/endSessionFunctions";

import asteroidButtons from "../elements/meteorButton";
import shieldImage from "../elements/shieldImage";
import { endButtonClassName } from "../elements/endSessionButton";

import { ISession } from "../../database/models/Session";
import { ISessionConfig } from "../../database/models/SessionConfig";
import { getSessionConfig } from "../dataHandler";

interface IAsteroidElements {
  correctHTMLElements,
  incorrectHTMLElements
}

export const appendToGame = (element: ChildNode) => {
  const gameElement = document.querySelector("#game");
  if (gameElement == null) throw new Error("div element with id \"game\" is missing");
  // @ts-ignore // FIXME: gameElement should have html canvas properties
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
const { width: canvasWidth, height: canvasHeight, questionWidth } = getCanvasDimensions(window.innerWidth);
const canvasConfig = { canvasWidth, questionWidth, canvasHeight };
// Single spawn elements
appendToGame(htmlToElement(shieldImage(canvasConfig)));
// FIXME: Dirty fix for phaser.Game loading async. Needs a shared state to know when Game/scene has loaded
setTimeout(() => {
  // Search for client-side elements to add functions to
  const endButtonCollection = document.body.getElementsByClassName(endButtonClassName);
  if (endButtonCollection.length === 0) throw new Error("SSRScript ran before endButton element was spawned");
  for (let i = 0; i < endButtonCollection.length; i++) {
    const endButton = endButtonCollection[i];
    mountClick(endButton, sessionId, lessonId);
  }
}, 1000)

asteroidButtons({
  canvasWidth,
  questionWidth,
})
  .then((asteroidElements) => {
    let currentSpawnInterval = applyAsteroidConfig(currentConfig, asteroidElements)
    let currentObserver = observeSSRElements(session, currentConfig, canvasConfig)

    // --- Periodically check for config changes
    const configRefreshInterval = 1000;
    setInterval(async () => {
      // TODO: check for ended game in a different loop
      if (window.gameEnded) {
        clearInterval(currentSpawnInterval);
      }
      else {
        // get new config
        const receivedConfig = await getSessionConfig(lessonId, { sessionId });
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
          currentObserver = observeSSRElements(session, currentConfig, canvasConfig)
        }
      }
    }, configRefreshInterval)
  });

console.log("server script finished");