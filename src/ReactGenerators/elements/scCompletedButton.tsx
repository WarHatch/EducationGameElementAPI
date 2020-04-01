import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

import { registerEndSession } from "../dataHandler";
import endSessionSplash from "../elements/popupCardElement";
import htmlToElement from "../gameScripts/htmlToElement";
import { appendToGame } from "../gameScripts/HTMLCanvasManager";

// Classnames
import { SCContainerClassname } from "../observer/sentenceConstructorLogic";

import config from "../../config";

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

export const mountCompleteClick = (buttonElement: Element, sessionId: string, lessonId: string, nextContentSlug) => {
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

    if (nextContentSlug) {
      console.warn(nextContentSlug + " --- loading not yet implemented");
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