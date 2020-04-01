// TODO: move directory outward

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
import { popupCardClassname, cardCloseButtonClassname } from "../elements/popupCardElement";

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
      mutation.addedNodes.forEach((newNode) => {
        // console.log(newNode);
        // @ts-ignore non-HTML element handling
        if (newNode.classList === undefined)
          return;
        const newElement = newNode as HTMLElement;

        if (newElement.classList.contains("SSRElement")) {
          const ssrElement: HTMLElement = newElement;

          if (ssrElement.classList.contains("SSR-MeteorContainer")) {
            // Asteroid game logic
            asteroidGameLogic(session, ssrElement, gameConfig as IAsteroidSessionConfig, canvasHeight);
          }
          // Misc elements
          else if (ssrElement.classList.contains(endButtonClassName)) {
            endFuncMount.mountClick(ssrElement, sessionId, lessonId);
          }
          else if (ssrElement.getAttribute("class")?.includes(popupCardClassname)) {
            const closeButton = ssrElement.getElementsByClassName(cardCloseButtonClassname)[0]
            popupCardFunctions.mountCloseClick(closeButton, ssrElement);
          }
        }
        if (newElement.classList.contains(SCContainerClassname)) {
          // Asteroid game logic
          sentenceConstructorLogic(session, newElement, gameConfig as ISentenceConstructorConfig);
        }
      });
    }
  });

  const targetNode = document.getElementById("game")
  if (targetNode === null) throw new Error("observe target node not found");
  observer.observe(targetNode, observerOptions);

  return observer;
}; 
