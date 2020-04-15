import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

// Classnames
import { SCContainerClassname } from "../observer/sentenceConstructorLogic";

import completeSession from "../gameScripts/sentenceConstructorGame/completeSession";

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
    <div className={`${SCContainerClassname}`} style={({
      marginBottom: 60,
    })}>
      <button aria-label={"complete"}
        className={`SSRClickable ${completedButtonClassname}`}
        style={containerStyle}
      // data-slotindex={}
      // onClick mounted through observer
      >
        Pabaigiau!
      </button>
    </div>
  )
}

export const mountCompleteClick = (
  buttonElement: HTMLElement,
  sessionId: string,
  lessonId: string,
  timeTrackerId: number,
  nextContentSlug: string | undefined,
  htmlCanvasConfig: IHTMLCanvasConfig
) => {
  // Fully overwriting click handler to ensure old ones are destroyed
  buttonElement.onclick = () => {
    completeSession(sessionId, lessonId, timeTrackerId, nextContentSlug, htmlCanvasConfig);
  }
}

export default (props: Props) => ReactDOMServer.renderToString(scCompleteButton(props));