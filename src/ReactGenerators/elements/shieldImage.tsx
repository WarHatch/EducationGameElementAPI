import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";
import { asteroid } from "../configs/gameConfigs";
import { canvasDimensions } from "../configs/canvasConfigs";
import { questionWidth } from "./question/question";

export interface Props {
}

const ShieldImage = (props: Props) => {
  const style: CSSProperties = {
    position: "absolute", // TODO: move to CSS
    top: asteroid.shieldPositionFromTop + "px",
    width: canvasDimensions.width - questionWidth + "px",
  }

  return (
    <img className="SSRElement SSR-Shield" src="http://localhost:8090/shield_line.png" style={style} />
  )
}

export default (props: Props) => ReactDOMServer.renderToString(ShieldImage(props));