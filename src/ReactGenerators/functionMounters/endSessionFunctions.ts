import { registerEndSession } from "../dataHandler";
import endSessionSplash from "../elements/popupCardElement";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame } from "../gameScripts/HTMLCanvasManager";
import config from "../../config";

export const mountClick = (buttonElement: Element, sessionId: string, lessonId: string) => {
  buttonElement.addEventListener("click", () => {
    if (window.gameEnded === true) return;
    
    const now = new Date();
    registerEndSession(
      lessonId,
      {
        finishedAt: now,
        sessionId,
      },
    )
    appendToGame(htmlToElement(endSessionSplash({
      cardTitle: "Žaidimas baigėsi",
      cardText: "Dėkojame, kad žaidėte"
    })));
    window.gameEnded = true;
  })
}
