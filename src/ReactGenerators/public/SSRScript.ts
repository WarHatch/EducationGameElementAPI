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
import question from "../elements/question";
import cleanup from "../gameScripts/asteroidGame/cleanup";
import { appendToGame, getHTMLCanvasElement } from "./code/HTMLCanvasManager";

// * Asteroid Game Functions

interface IAsteroidElements {
  correctHTMLElements,
  incorrectHTMLElements
}

const spawnAsteroid = ({
  correctHTMLElements,
  incorrectHTMLElements,
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
  asteroidButtons: IAsteroidElements,
) => {
  const { asteroidSpawnPerMinute } = config;

  const spawnTimeout = 60 * 1000 / asteroidSpawnPerMinute;
  const intervalSpawn = setInterval(() => {
    spawnAsteroid(asteroidButtons);
  }, spawnTimeout);

  return intervalSpawn;
}

// * Script

declare global {
  interface Window {
    session?: ISession | null;
    gameEnded: boolean;
  }
}

// --- Global params setup
if (window.session === undefined || window.session === null) {
  throw new Error("window.session is falsy");
}
const { session } = window;
console.log(session);
const { sessionId, lessonId, sessionConfigs } = session;
if (sessionConfigs === undefined || sessionConfigs[0] === undefined) {
  throw new Error("sessionConfigs is undefined");
}
let currentConfig: ISessionConfig = sessionConfigs[0];

window.gameEnded = false;

const { width: canvasWidth, height: canvasHeight, questionWidth } = getCanvasDimensions(window.innerWidth);
const canvasConfig = { canvasWidth, questionWidth, canvasHeight };

// --- Game start 
// FIXME: Dirty fix for phaser.GameScene loading async after this script is mounted
setTimeout(() => {
  const endButtonCollection = document.body.getElementsByClassName(endButtonClassName);
  if (endButtonCollection.length === 0) throw new Error("SSRScript ran before endButton element was spawned");
  for (let i = 0; i < endButtonCollection.length; i++) {
    mountClick(endButtonCollection[i], sessionId, lessonId);
  }
  // Single spawn elements
  question({ conteinerHeight: canvasHeight, width: questionWidth }).then((questionElement) => {
    appendToGame(htmlToElement(questionElement.html))
  })
  appendToGame(htmlToElement(shieldImage(canvasConfig)));

  // --- Retrieve asteroid elements and start game
  asteroidButtons({
    canvasWidth,
    questionWidth,
  })
    .then((asteroidElements) => {
      let currentSpawnInterval = applyAsteroidConfig(currentConfig, asteroidElements)
      let currentObserver = observeSSRElements(session, currentConfig, canvasConfig)

      // --- Periodically check for config changes and update spawners
      const configRefreshInterval = setInterval(async () => {
        if (window.gameEnded) {
          clearInterval(currentSpawnInterval);
          cleanup(getHTMLCanvasElement());
          console.log("Ending game");
          clearInterval(configRefreshInterval) // Kill self
        }
        else {
          // get new config
          const receivedConfig = await getSessionConfig(lessonId, { sessionId });
          // if received different config than the current
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
      }, 1000) // repeat after a second
    });

  console.log("server script finished mounting");
}, 700)