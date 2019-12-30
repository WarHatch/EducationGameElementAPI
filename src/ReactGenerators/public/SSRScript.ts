console.log("server script received");

import { v1 } from "uuid";

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"

import { startSession } from "../helpers/sessionManager";
import htmlToElement from "../helpers/htmlToElement";

import asteroidButtons from "../elements/meteorButton";
import observeSSRElements from "./observer";
import { defaultSessionConfig } from "../constants";
import { ISessionConfig } from "../../database/models/SessionConfig";
import Axios from "axios";

interface IAsteroidElements {
  correctHTMLElements,
  incorrectHTMLElements
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

let currentConfig: ISessionConfig = undefined;

const uuid = v1();

startSession({
  finishedAt: null,
  sessionId: uuid,

  sessionConfigs: [{
    sessionId: uuid,
    ...defaultSessionConfig,
  }]
}).then(async (session) => {
  const { sessionConfigs } = session;
  // assumes only 1 config was created
  currentConfig = sessionConfigs[0];

  // --- Initial setup
  const asteroidElements = await asteroidButtons();
  let currentSpawnInterval = applyAsteroidConfig(currentConfig, asteroidElements)
  let currentObserver = observeSSRElements(uuid, currentConfig)

  // spawnAsteroid(asteroidElements);

  // --- Periodically check for config changes
  const configRefreshInterval = 1000;
  setInterval(async () => {
    // get new config
    const configResponse = await Axios.post("http://localhost:8090/gameSession/config",
      { sessionId: uuid }
    );
    const receivedConfig = configResponse.data;
    // if received different config DTO than the current
    if (JSON.stringify(currentConfig) !== JSON.stringify(receivedConfig))
    {
      currentConfig = receivedConfig;
      // remove old intervals
      clearInterval(currentSpawnInterval);
      // apply new intervals
      currentSpawnInterval = applyAsteroidConfig(currentConfig, asteroidElements)

      // Disconnect old observer
      currentObserver.disconnect();
      // Setup SSR element observer with new config
      currentObserver = observeSSRElements(uuid, currentConfig)
    }
  }, configRefreshInterval)
});

console.log("server script finished");