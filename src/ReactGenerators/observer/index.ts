import asteroidGameLogic from "./asteroidGameLogic";
import sentenceConstructorLogic from "./sentenceConstructorLogic";

import * as endFuncMount from "../functionMounters/endSessionFunctions";
import * as popupCardFunctions from "../functionMounters/popupCardFunctions";

import { endButtonClassName } from "../elements/endSessionButton";

import { ISession } from "../../database/models/Session";
import { ISessionGameTypeConfigBase } from "../../database/sequelize.d";
import { IAsteroidSessionConfig } from "../../database/models/AsteroidSessionConfig";
import { ISentenceConstructorConfig } from "../../database/models/SentenceConstructorConfig";

// Classnames
import { SCContainerClassname } from "./sentenceConstructorLogic";
import { popupCardClassname, cardCloseButtonClassname, dissapearAfterFiveSecondsClassname } from "../elements/popupCardElement";

const observerOptions = {
  attributes: false,
  childList: true,
  subtree: true,
};

export default (
  session: ISession,
  gameConfig: ISessionGameTypeConfigBase,
  canvasConfig: { canvasHeight: number; },
  gameStartTimerId: number,
) => {
  const { sessionId, lessonId } = session;
  const { canvasHeight } = canvasConfig;
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      mutation.addedNodes.forEach((newNode) => {
        // @ts-ignore non-HTML element handling
        if (newNode.classList === undefined)
          return;
        const newElement = newNode as HTMLElement;

        // Asteroid game logic
        if (newElement.classList.contains("SSR-MeteorContainer")) {
          asteroidGameLogic(session, newElement, gameConfig as IAsteroidSessionConfig, canvasHeight);
        }
        // SC specific elements
        else if (newElement.classList.contains(SCContainerClassname)) {
          sentenceConstructorLogic(session, newElement, gameConfig as ISentenceConstructorConfig, gameStartTimerId);
        }
        // Misc elements
        else if (newElement.classList.contains(endButtonClassName)) {
          endFuncMount.mountClick(newElement, sessionId, lessonId);
        }
        else if (newElement.getAttribute("class")?.includes(popupCardClassname)) {
          const closeButton = newElement.getElementsByClassName(cardCloseButtonClassname)[0]
          if (closeButton) {
            popupCardFunctions.mountCloseClick(closeButton, newElement);
          }
          if (newElement.classList.contains(dissapearAfterFiveSecondsClassname)) {
            popupCardFunctions.dissapearAfterFiveSeconds(newElement);
          }
        }
        else {
          console.warn("unhandled observed mutation");
          console.warn(newElement);
        }
      });
    }
  });

  const targetNode = document.getElementById("game")
  if (targetNode === null) throw new Error("observe target node not found");
  observer.observe(targetNode, observerOptions);

  return observer;
}; 
