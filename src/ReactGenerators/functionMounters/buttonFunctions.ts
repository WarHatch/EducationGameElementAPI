// Types
import { asteroid } from "../configs/gameConfigs";

import config from "../../config";
import { mountRegisterClick } from "./_baseButtonFunctions";

export const mountAsteroidClick = (
  buttonElement: HTMLElement,
  sessionId: string,
  timeTrackId: number,
  correct: boolean,
  lessonId: string,
) => {
  const question = buttonElement.getAttribute("data-question");
  if (question === null) throw new Error("buttonElement.getAttribute('data-question') is not defined");

  mountRegisterClick(buttonElement, lessonId, timeTrackId, { sessionId, question, correct });
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
