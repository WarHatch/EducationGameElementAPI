// Assets need to be imported to be bundled
import "./assets/meteor.png"
import "./assets/shield_line.png"

import asteroidButtons from "../elements/meteorButton";
import shieldImage from "../elements/shieldImage";
import question from "../elements/question";
import { endButtonClassName } from "../elements/endSessionButton";

import observeSSRElements from "../observer";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "../gameScripts/HTMLCanvasManager";
import spawnAsteroid from "../gameScripts/asteroidGame/spawnAsteroid";
import cleanup from "../gameScripts/asteroidGame/cleanup";
import { mountClick } from "../functionMounters/endSessionFunctions";
import { getSessionConfig } from "../dataHandler";
import { questionWidth } from "../configs/commonElementConfigs";
import { ISession } from "../../database/models/Session";
import { IAsteroidSessionConfig } from "../../database/models/AsteroidSessionConfig";
import timeTracker from "../gameScripts/timeTracker";


interface IAsteroidElements {
  correctHTMLElements,
  incorrectHTMLElements
}

const applyAsteroidConfig = (
  config: IAsteroidSessionConfig,
  asteroidButtons: IAsteroidElements,
) => {
  const { asteroidSpawnPerMinute } = config;

  const spawnTimeout = 60 * 1000 / asteroidSpawnPerMinute;
  const intervalSpawn = setInterval(() => {
    spawnAsteroid(asteroidButtons);
  }, spawnTimeout);

  return intervalSpawn;
}

export default (sessionData: ISession, sessionConfig: IAsteroidSessionConfig, htmlCanvas: IHTMLCanvas) => {
  const { sessionId, lessonId } = sessionData;
  const { canvasWidth, canvasHeight } = htmlCanvas;

  // FIXME: Dirty fix for phaser.GameScene loading async after this script is mounted
  setTimeout(() => {
    const endButtonCollection = document.body.getElementsByClassName(endButtonClassName);
    if (endButtonCollection.length === 0) console.error("EduAsteroids script ran before endButton element was spawned");
    for (let i = 0; i < endButtonCollection.length; i++) {
      mountClick(endButtonCollection[i], sessionId, lessonId);
    }
    // Single spawn elements
    question({ conteinerHeight: canvasHeight, width: questionWidth }).then((questionElement) => {
      appendToGame(htmlToElement(questionElement.html))
    })
    appendToGame(htmlToElement(shieldImage({ canvasWidth, canvasHeight, questionWidth })));

    // --- Retrieve asteroid elements and start game
    asteroidButtons({
      canvasWidth,
      questionWidth,
    })
      .then((asteroidElements) => {
        const startGameTimerId = timeTracker.startTimer();
        let currentSpawnInterval = applyAsteroidConfig(sessionConfig, asteroidElements)
        let currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvas, startGameTimerId)

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
            if (JSON.stringify(sessionConfig) !== JSON.stringify(receivedConfig)) {
              // TODO: add validation for receivedConfig
              sessionConfig = receivedConfig as IAsteroidSessionConfig;
              // remove old intervals
              clearInterval(currentSpawnInterval);
              // apply new intervals
              currentSpawnInterval = applyAsteroidConfig(sessionConfig, asteroidElements)

              // Disconnect old observer
              currentObserver.disconnect();
              // Setup SSR element observer with new config
              currentObserver = observeSSRElements(sessionData, sessionConfig, htmlCanvas, startGameTimerId)
            }
          }
        }, 1000) // repeat after a second
      });

    console.log("EduAsteroid script finished mounting");
  }, 700)
}