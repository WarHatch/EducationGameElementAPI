import React from "react";
import ReactDOMServer from "react-dom/server";

import { IAnswer } from "../../../routes/gameElements/dataSet";

type Props = {
  answerData: IAnswer,
  quizTitle: string,
  correct: boolean,
}

const Button = (props: Props) => {
  const {answerData, quizTitle, correct} = props;
  return (
    <>
      <button
        data-type={answerData._type}
        data-correct={correct}
        data-question={quizTitle}
        className={`SSRElement SSR-${answerData.backgroundColor}`}
        //onClick mounted after ReactDOMServer render
      >
        {answerData.title}
      </button>
    </>
  )
}

export default (buttonData: Props) => ReactDOMServer.renderToString(Button(buttonData));