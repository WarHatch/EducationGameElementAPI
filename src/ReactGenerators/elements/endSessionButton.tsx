import React from "react";
import ReactDOMServer from "react-dom/server";

type Props = {
}

export const endButtonClassName = "SSRElement SSRAbsolute SSRClickable SSR-EndSessionButton"
const EndButton = (props: Props) => {
  const { } = props;
  return (
    <button
      data-type="end-button"
      className={endButtonClassName}
      //onClick mounted after ReactDOMServer render
    >
      {"End Game Session"}
    </button>
  )
}

export default (props: Props) => ReactDOMServer.renderToString(EndButton(props));