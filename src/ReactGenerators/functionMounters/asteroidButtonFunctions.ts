// Types
import { asteroid } from "../configs/gameConfigs";

import { registerAsteroidClick } from "../dataHandler";
import timeTracker from "../gameScripts/timeTracker";
import { IAsteroidClickDataModel } from "../../database/models/AsteroidClickData";

export const mountAsteroidClick = (
  buttonElement: HTMLElement,
  sessionId: string,
  timeTrackId: number,
  correct: boolean,
  lessonId: string,
) => {
  buttonElement.addEventListener("click", () => {
    const spawnToClickTime = timeTracker.checkTimer(timeTrackId)

    const question = buttonElement.getAttribute("data-question");
    if (question === null) throw new Error("buttonElement.getAttribute('data-question') is not defined");

    const payload: IAsteroidClickDataModel = {
      sessionId, question, correct,
      spawnToClickTime
    };
    registerAsteroidClick(payload, lessonId);

    const buttonContainer = buttonElement.parentNode;
    buttonContainer?.parentNode?.removeChild(buttonContainer);
  });
}

const moveDown = (buttonElement: HTMLElement, moveDownPX: number) => {
  buttonElement.style.top = (buttonElement.offsetTop + moveDownPX) + "px";
}

const checkAndRemove = (distanceToShield: number, element: HTMLElement) => {
  try {
    const topAttr = element.style.top;
    const distanceDescended = parseInt(topAttr.substr(0, topAttr.length - 2));
    if (distanceDescended >= distanceToShield - asteroid.meteorSize / 4) {
      element.parentNode?.removeChild(element);
    }
  } catch (error) {
    console.error("Error trying to extract number from element.style.top. Expected px attribute")
  }
}

const getRoundingRemainder = (n: number) => {
  const rounded = Math.round(n);

  return n - rounded;
}

export const mountFalling = (element: HTMLElement, gameHeight: number, asteroidSecondsToCrash: number) => {
  const distanceToShield = gameHeight - asteroid.shieldPositionFromBottom;
  const fallSpeed = distanceToShield / asteroidSecondsToCrash;
  const fps = 30;
  const refreshRateMS = 1000 / fps;
  const fallDelta = fallSpeed / fps;

  let fallRemainder: number = 0;
  setInterval(() => {
    fallRemainder += getRoundingRemainder(fallDelta)
    const adjustValue = fallRemainder > 0 ? Math.floor(fallRemainder) : Math.ceil(fallRemainder);
    const adjustedFallDelta = fallDelta + adjustValue;
    fallRemainder -= adjustValue;

    moveDown(element, adjustedFallDelta);
    checkAndRemove(distanceToShield, element);
  }, refreshRateMS);
}
