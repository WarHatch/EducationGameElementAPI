import React from "react";
import ReactDOMServer from "react-dom/server";

import { IAnswer } from ".";

type Props = {
  answerData: IAnswer,
  quizTitle: string,
  correct: boolean,
  xPosition: string,
}

const Button = (props: Props) => {
  const {answerData, quizTitle, correct, xPosition} = props;

  const meteorContainerStyle = {
    left: xPosition,
  };

  return (
    <div className="SSRElement SSR-MeteorContainer" style={meteorContainerStyle}>
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