import React from "react";
import ReactDOMServer from "react-dom/server";

interface Props {
  quizTitle: string,
}

const Question = (props: Props) => {
  return (
    <div className={"SSRElement SSR-QuestionContainer"}>
      <span data-type={"question-text"} className={"SSR-QuestionText"}>
        {props.quizTitle}
      </span>
    </div>
  )
}

export default  (props: Props) => ReactDOMServer.renderToString(Question(props));