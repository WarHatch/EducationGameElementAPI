import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

// Classnames
import { SCContainerClassname } from "../observer/sentenceConstructorLogic";

import config from "../../config";

type Props = {
  hintMessageCount: number
}

export const hintButtonClassname = "SSR-HintButton";
export const hintCounterClassname = "SSRHintCounter";

const hintButton = (props: Props) => {
  const { } = props;

  const containerStyle: CSSProperties = {
    float: "right",
    margin: 15,
  };

  return (
    <button aria-label={"hint"}
      className={`SSRClickable` + " " + SCContainerClassname + " " + hintButtonClassname}
      style={containerStyle}
      // data-slotindex={answerIndex}
      // onClick mounted through observer
    >
      Užuominos iš mokytojo: 
      <span className={hintCounterClassname}>{props.hintMessageCount}</span>
    </button>
  )
}

export default (props: Props) => ReactDOMServer.renderToString(hintButton(props));