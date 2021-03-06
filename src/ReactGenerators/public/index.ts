console.log("EduGames server script received");
// TODO: temp fix for loading assets of EduSentenceConstructor
import "./assets/question_button.png"

// ------------ Assets need to be imported to be bundled
import "./gameElementsStylesheet.css"

// ------------ Game types
import EduAsteroidsStart from "./EduAsteroids";
import EduSentenceConstructorStart, { sentenceConstructorGameTypeName } from "./EduSentenceConstructor";

// ------------ Interfaces
import { ISession } from "../../database/models/Session";
import { IAsteroidSessionConfig } from "../../database/models/AsteroidSessionConfig";
import { ISCGlobal } from "./EduSentenceConstructor";

// ------------ libs
import { getLesson } from "../dataHandler";

// ------------ Global params validation
declare global {
  interface IHTMLCanvasConfig {
    canvasWidth: number
    canvasHeight: number
  }

  interface Window {
    session?: ISession | null;
    htmlCanvas?: IHTMLCanvasConfig
    gameEnded: boolean;

    sentenceConstructorParams?: ISCGlobal
  }
}

if (window.session === undefined || window.session === null) {
  throw new Error("window.session is falsy");
}
if (window.htmlCanvas === undefined) {
  throw new Error("window.htmlCanvas is undefined");
}
const { session, htmlCanvas } = window;
console.log(session);
if (window.gameEnded !== false) {
  // ------------ Game launch
  window.gameEnded = false;
  // Game mode determined by initial session config
  const { asteroidSessionConfigs, sentenceConstructorConfigs } = session;
  // Content info retrieved
  getLesson({ id: session.lessonId }).then(({ contentSlug, gameType, gameContentJSON }) => {
    if (gameType === "asteroid") {
      const sessionConfigs = asteroidSessionConfigs as IAsteroidSessionConfig[];
      EduAsteroidsStart(session, sessionConfigs[0], htmlCanvas)
    } else if (gameType === sentenceConstructorGameTypeName) {
      EduSentenceConstructorStart(session, htmlCanvas, contentSlug, gameContentJSON)
    } else {
      throw new Error("unknown gameType received: " + gameType);
    }
  })
}
