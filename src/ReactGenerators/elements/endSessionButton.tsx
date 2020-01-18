import React from "react";
import ReactDOMServer from "react-dom/server";

type Props = {
}

const EndButton = (props: Props) => {
  const { } = props;
  return (
    <button
      data-type="end-button"
      className={"SSRElement SSRClickable SSR-EndSessionButton"}
      //onClick mounted after ReactDOMServer render
    >
      {"End Game Session"}
    </button>
  )
}

export default (props: Props) => ReactDOMServer.renderToString(EndButton(props));