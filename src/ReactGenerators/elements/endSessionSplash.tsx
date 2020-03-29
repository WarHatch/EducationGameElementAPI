import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

export interface Props {
}

const GamePopupReactElement = (props: Props) => {
  return (
    <div className={"SSRElement SSRAbsolute SSR-splash"}>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Game ended</h5>
          <p className="card-text">Thank you for your help</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  )
}



export default (props: Props) => ReactDOMServer.renderToString(GamePopupReactElement(props));
