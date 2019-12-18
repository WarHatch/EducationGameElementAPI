import React from "react";
import ReactDOMServer from "react-dom/server";

import { IAnswer } from "../../../routes/gameElements/dataSet";

type Props = IAnswer

const Button = (props: Props) => {
  return (
    <>
      <button
        data-type={props._type}
        data-correct={false}
        className={`SSRElement SSR-${props.backgroundColor}`}
        //onClick mounted after ReactDOMServer render
      >
        {props.title}
      </button>
    </>
  )
}

export default (buttonData: IAnswer) => ReactDOMServer.renderToString(Button(buttonData));