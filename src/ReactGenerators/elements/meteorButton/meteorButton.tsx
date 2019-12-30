import React from "react";
import ReactDOMServer from "react-dom/server";

import { IAnswer } from ".";

type Props = {
  answerData: IAnswer,
  quizTitle: string,
  correct: boolean,
}

const Button = (props: Props) => {
  const {answerData, quizTitle, correct} = props;
  return (
    <div className="SSRElement SSR-MeteorContainer">
      <img className="SSR-Meteor" src="http://localhost:8090/meteor.png" />
      <button
        data-type={answerData._type}
        data-correct={correct}
        data-question={quizTitle}
        className={`SSR-${answerData.backgroundColor}`}
        //onClick mounted after ReactDOMServer render
      >
        {answerData.title}
      </button>
    </div>
  )
}

export default (buttonData: Props) => ReactDOMServer.renderToString(Button(buttonData));