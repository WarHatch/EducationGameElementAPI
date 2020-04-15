import { registerEndSession, registerSCCompletedClick } from "../../dataHandler";
import endSessionSplash from "../../elements/popupCardElement";
import htmlToElement from "../../gameScripts/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "../../gameScripts/HTMLCanvasManager";
import cleanup from "../../gameScripts/sentenceConstructorGame/cleanup";
import EduSentenceConstructor from "../../public/EduSentenceConstructor";
import { ISession } from "../../../database/models/Session";
import attemptedAnswerIndexString from "../../gameScripts/sentenceConstructorGame/attemptedAnswerIndexString";
import correctAnswerPercentage from "../../gameScripts/sentenceConstructorGame/correctAnswerPercentage";
import timeTracker from "../../gameScripts/timeTracker";

export default (
  sessionId: string,
  lessonId: string,
  timeTrackerId: number,
  nextContentSlug: string | undefined,
  htmlCanvasConfig: IHTMLCanvasConfig
) => {
  if (window.gameEnded === true) return;

  const now = new Date();
  registerEndSession(
    lessonId,
    {
      finishedAt: now,
      sessionId,
    },
  )

  // gather data
  const attemptedAnswerString = attemptedAnswerIndexString();
  const correctPercentage = correctAnswerPercentage(attemptedAnswerString)

  registerSCCompletedClick({
    attemptedAnswerString,
    correctPercentage,
    sessionId,
    spawnToClickTime: timeTracker.checkTimer(timeTrackerId)
  }, lessonId)

  // Remove elements spawned so far...
  cleanup(getHTMLCanvasElement());
  // DEPRECATED: Load next content if possible
  if (nextContentSlug) {
    // ⚠ reusing the old session for a different content game
    EduSentenceConstructor(window.session as ISession, nextContentSlug, htmlCanvasConfig)
  } else {
    window.gameEnded = true;
    appendToGame(htmlToElement(endSessionSplash({
      cardTitle: "Žaidimas baigėsi",
      cardText: "Dėkojame, kad žaidėte",
      dissapearAfterFiveSeconds: true,
    })));
  }
}