import asteroidGameLogic from "./asteroidGameLogic";
import sentenceConstructorLogic from "./sentenceConstructorLogic";
import * as endFuncMount from "../../functionMounters/endSessionFunctions";
import { endButtonClassName } from "../../elements/endSessionButton";

import { ISession } from "../../../database/models/Session";
import { ISessionGameTypeConfigBase } from "../../../database/sequelize.d";
import { IAsteroidSessionConfig } from "../../../database/models/AsteroidSessionConfig";
import { ISentenceConstructorConfig } from "../../../database/models/SentenceConstructorConfig";

// Classnames
import { contentOptionContainerClassname } from "../../elements/contentOptionButton";

const observerOptions = {
  attributes: false,
  childList: true,
  subtree: true,
};

export default (session: ISession, gameConfig: ISessionGameTypeConfigBase, canvasConfig: { canvasHeight: number; }) => {
  const { sessionId, lessonId } = session;
  const { canvasHeight } = canvasConfig;

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      // Overwriting mutations Node type
      mutation.addedNodes.forEach((newNode: HTMLElement) => {
        if (newNode.classList.contains("SSRElement")) {
          const ssrElement: HTMLElement = newNode;

          if (ssrElement.classList.contains("SSR-MeteorContainer")) {
            // Asteroid game logic
            asteroidGameLogic(session, ssrElement, gameConfig as IAsteroidSessionConfig, canvasHeight);
          }
          if (ssrElement.classList.contains(contentOptionContainerClassname)) {
            // Asteroid game logic
            sentenceConstructorLogic(session, ssrElement, gameConfig as ISentenceConstructorConfig);
          }
          // Misc elements
          else if (ssrElement.classList.contains(endButtonClassName)) {
            endFuncMount.mountClick(ssrElement, sessionId, lessonId);
          }
        }
      });
    }
  });

  const targetNode = document.getElementById("game")
  if (targetNode === null) throw new Error("observe target node not found");
  observer.observe(targetNode, observerOptions);

  return observer;
}; 
