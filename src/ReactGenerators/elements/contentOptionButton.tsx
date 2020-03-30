import React from "react";
import ReactDOMServer from "react-dom/server";

// Classnames
import { SCContainerClassname } from "../observer/sentenceConstructorLogic";

import config from "../../config";
import { urlFor } from "../../cmsDataHandler/sanityImageHandler";

// word: string,
// picture: {
//   asset: {
//     _ref: string,
//     _type: string //"reference"
//   }
// }
type Props = {
  imageRef: string,
  correctPlacement: number | null,
  ariaLabel?: string,
}

const Button = (props: Props) => {
  const { ariaLabel, imageRef, correctPlacement } = props;

  const containerStyle = {

  };
  const imageStyle = {

  };
  const imageURL = urlFor(imageRef).width(100).height(100).url();
  if (imageURL === null) throw new Error("Unable to get url of image. Passed imageRef = " + imageRef);

  return (
    <button aria-label={ariaLabel}
      role="contentOptionButton"
      className={`SSRClickable ${SCContainerClassname}`}
      style={containerStyle}
      data-correctplacement={correctPlacement}
    >
      <img className="SSR-ImageButton" style={imageStyle} src={imageURL} />
    </button>
  )
}

export default (contentOptionButtonProps: Props) => ReactDOMServer.renderToString(Button(contentOptionButtonProps));