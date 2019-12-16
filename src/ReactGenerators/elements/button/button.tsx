import React from "react";
import ReactDOMServer from "react-dom/server";

export type IButtonData = {
  _key: string,
  _type: "button",
  title: string,
  backgroundColor: string,
  disappears: boolean,
  trackable: boolean,
}

type Props = IButtonData

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

export default (buttonData: IButtonData) => ReactDOMServer.renderToString(Button(buttonData));