import React from "react";
import ReactDOMServer from "react-dom/server";

interface Props {
  quizTitle: string,
  explanation: string,
}

const paddingStyle = {
  padding: "1rem",
  paddingTop: "unset",
}

const Question = (props: Props) => {
  return (
    <div className={"SSRElement SSR-QuestionContainer"}>
      <span data-type={"question-text"} className={"SSR-QuestionText"} style={paddingStyle}>
        <b>{props.quizTitle}</b>
      </span>
      <span data-type={"question-explanation"} className={"SSR-QuestionExplanation"} style={paddingStyle}>
        {props.explanation}
      </span>
    </div>
  )
}

export default  (props: Props) => ReactDOMServer.renderToString(Question(props));