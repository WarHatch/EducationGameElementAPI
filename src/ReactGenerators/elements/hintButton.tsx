import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

// Classnames
import { SCContainerClassname } from "../observer/sentenceConstructorLogic";

import config from "../../config";

type Props = {
  hintMessageCount: number
}

export const hintButtonContainerClassname = "SSR-StoryTextContainer";

const hintButton = (props: Props) => {
  const { } = props;

  const containerStyle: CSSProperties = {
    float: "right",
    margin: 15,
  };

  return (
    <button aria-label={"hint"}
      className={`SSRClickable` + " " + SCContainerClassname + " " + hintButtonContainerClassname}
      style={containerStyle}
      // data-slotindex={answerIndex}
      // TODO: onClick mounted through observer
    >
      Užuominos iš mokytojo: 
      <span className={`SSRHintCounter`}>{props.hintMessageCount}</span>
    </button>
  )
}

export default (props: Props) => ReactDOMServer.renderToString(hintButton(props));