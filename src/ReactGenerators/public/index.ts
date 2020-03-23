console.log("EduGames server script received");

// ------------ Assets need to be imported to be bundled
import "./gameElementsStylesheet.css"

// ------------ Game types
import EduAsteroidsStart from "./EduAsteroids";
import EduSentenceConstructorStart from "./EduSentenceConstructor";

// ------------ Interfaces
import { ISession } from "../../database/models/Session";

declare global {
  interface IHTMLCanvas {
    canvasWidth: number
    canvasHeight: number
  }

  interface Window {
    // Set by client
    session?: ISession | null;
    htmlCanvas?: IHTMLCanvas
    // Initial set by server
    gameEnded: boolean;
  }
}

// ------------ Global params validation
if (window.session === undefined || window.session === null) {
  throw new Error("window.session is falsy");
}
if (window.htmlCanvas === undefined) {
  throw new Error("window.htmlCanvas is undefined");
}
const { session, htmlCanvas } = window;
console.log(session);

// ------------ Game launch
window.gameEnded = false;
// Game mode determined by initial session config
const { asteroidSessionConfigs, sentenceConstructorConfigs } = session;
if (asteroidSessionConfigs !== undefined && asteroidSessionConfigs[0] !== undefined) {
  EduAsteroidsStart(session, asteroidSessionConfigs[0], htmlCanvas)
} else if (sentenceConstructorConfigs !== undefined && sentenceConstructorConfigs[0] !== undefined) {
  EduSentenceConstructorStart(session, sentenceConstructorConfigs[0], htmlCanvas)
} else {
  throw new Error("no (initial) session configuration received - cannot determine game type");
}