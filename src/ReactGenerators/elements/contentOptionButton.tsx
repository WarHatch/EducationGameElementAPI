import React from "react";
import ReactDOMServer from "react-dom/server";
import config from "../../config";

// word: string,
// picture: {
//   asset: {
//     _ref: string,
//     _type: string //"reference"
//   }
// }
type Props = {
  imageURL: string,
  imageWidth: number,
  correctPlacement: number | null,
  ariaLabel?: string,
}

export const contentOptionContainerClassname = "SSR-SConstructorContainer";

const Button = (props: Props) => {
  const { ariaLabel, imageURL, imageWidth, correctPlacement } = props;

  const containerStyle = {

  };
  const imageStyle = {

  };

  return (
    <div role="img" aria-label={ariaLabel}
      className={`SSRElement ${contentOptionContainerClassname}`} style={containerStyle}
    >
      <img className="SSR-ImageButton" style={imageStyle} src={imageURL} />
      <button
        // data-type={answerData._type}
        data-correctplacement={correctPlacement}
        className={`SSRClickable`}
        //onClick mounted after ReactDOMServer render
      >
        {}
      </button>
    </div>
  )
}

export default (contentOptionButtonProps: Props) => ReactDOMServer.renderToString(Button(contentOptionButtonProps));