import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

export interface Props {
  cardText: string,
  cardTitle?: string,
  exitable?: boolean
}

export const popupCardClassname = "SSR-splash"
export const cardCloseButtonClassname = "close SSRClickable"

const PopupCardElement = (props: Props) => {
  const {
    cardText,
    cardTitle,
    exitable,
  } = props;

  return (
    <div className={"SSRElement SSRAbsolute " + popupCardClassname}>
      <div className="card">
        <div className="card-body">
          {cardTitle && <h5 className="card-title">{cardTitle}</h5>}
          {exitable && <button type="button" className={cardCloseButtonClassname} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>}
          <p className="card-text">{cardText}</p>
          {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
        </div>
      </div>
    </div>
  )
}



export default (props: Props) => ReactDOMServer.renderToString(PopupCardElement(props));
