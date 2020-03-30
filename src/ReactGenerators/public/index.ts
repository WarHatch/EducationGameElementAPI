console.log("EduGames server script received");
// FIXME: temp fix for loading assets
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
  interface IHTMLCanvas {
    canvasWidth: number
    canvasHeight: number
  }

  interface Window {
    session?: ISession | null;
    htmlCanvas?: IHTMLCanvas
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

// ------------ Game launch
window.gameEnded = false;
// Game mode determined by initial session config
const { asteroidSessionConfigs, sentenceConstructorConfigs } = session;
// Content info retrieved
getLesson({id: session.lessonId}).then(({ contentSlug, gameType }) => {
  console.log("contentSlug: " + contentSlug);

  if (gameType === "asteroid") {
    const sessionConfigs = asteroidSessionConfigs as IAsteroidSessionConfig[];
    EduAsteroidsStart(session, sessionConfigs[0], htmlCanvas)
  } else if (gameType === sentenceConstructorGameTypeName) {
    EduSentenceConstructorStart(session, contentSlug, htmlCanvas)
  } else {
    throw new Error("unknown gameType received: " + gameType);
  }
})
