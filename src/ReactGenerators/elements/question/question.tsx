import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

interface Props {
  quizTitle: string,
  explanation: string,
  conteinerHeight: number,
  width: number;
}

const Question = (props: Props) => {
  const { conteinerHeight, width } = props;

  const containerStyle: CSSProperties = {
    height: conteinerHeight,
    width,
  }

  const textStyle: CSSProperties = {
    padding: "1rem",
    paddingTop: "unset",
  }

  return (
    <div className={"SSRElement SSRAbsolute SSR-QuestionContainer"} style={containerStyle}>
      <span data-type={"question-text"} className={"SSR-QuestionText"} style={textStyle}>
        <b>{props.quizTitle}</b>
      </span>
      <span data-type={"question-explanation"} className={"SSR-QuestionExplanation"} style={textStyle}>
        {props.explanation}
      </span>
    </div>
  )
}

export default (props: Props) => ReactDOMServer.renderToString(Question(props));