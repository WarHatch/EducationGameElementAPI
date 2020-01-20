import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";
import { asteroid } from "../configs/gameConfigs";

export interface Props {
  canvasWidth: number,
  canvasHeight: number,
  questionWidth: number,
}

const ShieldImage = (props: Props) => {
  const style: CSSProperties = {
    top: props.canvasHeight - asteroid.shieldPositionFromBottom,
    left: props.questionWidth,
    width: props.canvasWidth,
  }

  return (
    <img className="SSRElement SSR-Shield" src="http://localhost:8090/shield_line.png" style={style} />
  )
}

export default (props: Props) => ReactDOMServer.renderToString(ShieldImage(props));