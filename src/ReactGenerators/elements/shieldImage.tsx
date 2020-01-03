import React from "react";
import ReactDOMServer from "react-dom/server";
import { asteroid } from "../gameConfigs";

const ShieldImage = () => {
  const style = {
    top: asteroid.shieldPositionFromTop + "px",
  }

  return (
    <img className="SSR-Shield" src="http://localhost:8090/shield_line.png" style={style} />
  )
}

export default () => ReactDOMServer.renderToString(ShieldImage());