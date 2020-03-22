// Assets need to be imported to be bundled
// ...

import { endButtonClassName } from "../elements/endSessionButton";

import observeSSRElements from "../gameScripts/observer";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "../gameScripts/HTMLCanvasManager";
import { mountClick } from "../functionMounters/endSessionFunctions";
import { getSessionConfig } from "../dataHandler";
import { ISession } from "../../database/models/Session";
import { ISessionConfig } from "../../database/models/SessionConfig";

export default (sessionData: ISession, sessionConfig: ISessionConfig, htmlCanvas: IHTMLCanvas) => {
  const { sessionId, lessonId, sessionConfigs } = sessionData;
  const { canvasWidth, canvasHeight } = htmlCanvas;

  console.log("EduSentenceConstructor script finished mounting");
}
