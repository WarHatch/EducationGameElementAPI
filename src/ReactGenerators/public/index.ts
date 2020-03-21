console.log("EduGames server script received");

// ------------ Assets need to be imported to be bundled
import "./gameElementsStylesheet.css"

// ------------ Game types
import EduAsteroidsStart from "./EduAsteroids";

// ------------ Interfaces
import { ISession } from "../../database/models/Session";
import { ISessionConfig } from "../../database/models/SessionConfig";

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
const { sessionConfigs } = session;
if (sessionConfigs === undefined || sessionConfigs[0] === undefined) {
  throw new Error("sessionConfigs is undefined");
}
let initialSessionConfig: ISessionConfig = sessionConfigs[0];

// ------------ Game launch
window.gameEnded = false;
EduAsteroidsStart(session, initialSessionConfig, htmlCanvas)