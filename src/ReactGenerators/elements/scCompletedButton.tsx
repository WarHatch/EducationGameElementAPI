import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";


// Classnames
import { SCContainerClassname } from "../observer/sentenceConstructorLogic";

import { registerEndSession } from "../dataHandler";
import endSessionSplash from "../elements/popupCardElement";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame, getHTMLCanvasElement } from "../gameScripts/HTMLCanvasManager";
import config from "../../config";
import cleanup from "../gameScripts/sentenceConstructorGame/cleanup";
import EduSentenceConstructor from "../public/EduSentenceConstructor";
import { ISession } from "../../database/models/Session";

type Props = {
}

export const completedButtonClassname = "SSR-scCompleteButton";

const scCompleteButton = (props: Props) => {
  const { } = props;

  const containerStyle: CSSProperties = {
    float: "right",
    margin: 15,
  };

  return (
    <button aria-label={"complete"}
      className={`SSRClickable ${SCContainerClassname} ${completedButtonClassname}`}
      style={containerStyle}
    // data-slotindex={}
    // TODO: onClick mounted through observer
    >
      Pabaigiau!
    </button>
  )
}

export const mountCompleteClick = (
  buttonElement: Element,
  sessionId: string,
  lessonId: string,
  nextContentSlug: string | undefined,
  htmlCanvasConfig: IHTMLCanvasConfig
  ) => {
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

    // Remove elements spawned so far...
    cleanup(getHTMLCanvasElement());
    if (nextContentSlug) {
      // TODO: specify why reusing the old session for a different content game
      EduSentenceConstructor(window.session as ISession, nextContentSlug, htmlCanvasConfig)
    } else {
      window.gameEnded = true;
      appendToGame(htmlToElement(endSessionSplash({
        cardTitle: "Žaidimas baigėsi",
        cardText: "Dėkojame, kad žaidėte"
      })));
    }
  })
}


export default (props: Props) => ReactDOMServer.renderToString(scCompleteButton(props));