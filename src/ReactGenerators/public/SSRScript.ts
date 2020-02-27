console.log("server script received");

// Assets need to be imported to be bundled
import "./gameElementsStylesheet.css"
import "./assets/meteor.png"
import "./assets/shield_line.png"

import observeSSRElements from "./code/observer";
import htmlToElement from "./code/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "./code/HTMLCanvasManager";

import asteroidButtons from "../elements/meteorButton";
import shieldImage from "../elements/shieldImage";
import question from "../elements/question";
import { endButtonClassName } from "../elements/endSessionButton";

import { mountClick } from "../functionMounters/endSessionFunctions";
import { getSessionConfig } from "../dataHandler";
import cleanup from "../gameScripts/asteroidGame/cleanup";
import { questionWidth } from "../configs/commonElementConfigs";
import { ISession } from "../../database/models/Session";
import { ISessionConfig } from "../../database/models/SessionConfig";

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
    // Set by client
    session?: ISession | null;
    htmlCanvas?: {
      canvasWidth: number
      canvasHeight: number
    }
    // Initial set by server
    gameEnded: boolean;
  }
}

// --- Global params setup
if (window.session === undefined || window.session === null) {
  throw new Error("window.session is falsy");
}
if (window.htmlCanvas === undefined) {
  throw new Error("window.htmlCanvas is undefined");
}
const { session, htmlCanvas } = window;
console.log(session);
const { sessionId, lessonId, sessionConfigs } = session;
if (sessionConfigs === undefined || sessionConfigs[0] === undefined) {
  throw new Error("sessionConfigs is undefined");
}
let currentConfig: ISessionConfig = sessionConfigs[0];

window.gameEnded = false;

const { canvasWidth, canvasHeight } = htmlCanvas;

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
  appendToGame(htmlToElement(shieldImage({canvasWidth, canvasHeight, questionWidth})));

  // --- Retrieve asteroid elements and start game
  asteroidButtons({
    canvasWidth,
    questionWidth,
  })
    .then((asteroidElements) => {
      let currentSpawnInterval = applyAsteroidConfig(currentConfig, asteroidElements)
      let currentObserver = observeSSRElements(session, currentConfig, htmlCanvas)

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
            currentObserver = observeSSRElements(session, currentConfig, htmlCanvas)
          }
        }
      }, 1000) // repeat after a second
    });

  console.log("server script finished mounting");
}, 700)