import React from "react";
import ReactDOMServer from "react-dom/server";

import { IAnswer } from "../../../routes/gameElements/dataSet";

type Props = IAnswer

const Button = (props: Props) => {
  return (
    <>
      <button
        react-type={props._type}
        className={`SSRElement SSR-${props.backgroundColor}`}
        //onClick mounted after ReactDOMServer render
      >
        {props.title}
      </button>
    </>
  )
}

export default (buttonData: IAnswer) => ReactDOMServer.renderToString(Button(buttonData));