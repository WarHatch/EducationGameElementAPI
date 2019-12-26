import React from "react";
import ReactDOMServer from "react-dom/server";

const SessionId = () => {
  return (
    <span data-type={"sessionId-text"} className={"SSRElement SSR-sessionid SSR-white"}>
      Waiting for session id...
    </span>
  )
}

export default () => ReactDOMServer.renderToString(SessionId());