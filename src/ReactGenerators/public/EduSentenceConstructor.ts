// Assets need to be imported to be bundled
// ...

import { endButtonClassName } from "../elements/endSessionButton";

import observeSSRElements from "../gameScripts/observer";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "../gameScripts/HTMLCanvasManager";
import { mountClick } from "../functionMounters/endSessionFunctions";
import { getSessionConfig } from "../dataHandler";
import { ISession } from "../../database/models/Session";
import { IAsteroidSessionConfig } from "../../database/models/AsteroidSessionConfig";

export default (sessionData: ISession, sentenceConstructorSessionConfig, htmlCanvas: IHTMLCanvas) => {
  const { sessionId, lessonId } = sessionData;
  const { canvasWidth, canvasHeight } = htmlCanvas;

  console.log("EduSentenceConstructor script finished mounting");
}
