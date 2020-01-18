import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";
import { canvasDimensions } from "../../configs/canvasConfigs";

interface Props {
  quizTitle: string,
  explanation: string,
}

export const questionWidth = 300;

const containerStyle: CSSProperties = {
  height: canvasDimensions.height,
  width: questionWidth + "px",
}

const textStyle: CSSProperties = {
  padding: "1rem",
  paddingTop: "unset",
}

const Question = (props: Props) => {
  return (
    <div className={"SSRElement SSR-QuestionContainer"} style={containerStyle}>
      <span data-type={"question-text"} className={"SSR-QuestionText"} style={textStyle}>
        <b>{props.quizTitle}</b>
      </span>
      <span data-type={"question-explanation"} className={"SSR-QuestionExplanation"} style={textStyle}>
        {props.explanation}
      </span>
    </div>
  )
}

export default  (props: Props) => ReactDOMServer.renderToString(Question(props));