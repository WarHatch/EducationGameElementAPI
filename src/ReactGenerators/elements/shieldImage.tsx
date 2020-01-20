import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";
import { asteroid } from "../configs/gameConfigs";
import { questionWidth } from "./question/question";

export interface Props {
  canvasWidth: number
}

const ShieldImage = (props: Props) => {
  const style: CSSProperties = {
    top: asteroid.shieldPositionFromTop + "px",
    width: props.canvasWidth - questionWidth + "px",
  }

  return (
    <img className="SSRElement SSR-Shield" src="http://localhost:8090/shield_line.png" style={style} />
  )
}

export default (props: Props) => ReactDOMServer.renderToString(ShieldImage(props));