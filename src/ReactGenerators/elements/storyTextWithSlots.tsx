import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";
import config from "../../config";
import { urlFor } from "../../cmsDataHandler/sanityImageHandler";

type Props = {
  textSnippets: string[],
}

const textElementStyle: CSSProperties = {
  display: "inline",
}

const answerInput = (ariaLabel: string, answerIndex: number) => {
  return (
    <button aria-label={ariaLabel}
      className={`SSRClickable`}
      style={textElementStyle}
      data-slotindex={answerIndex}
    // onClick mounted through observer
    >
      {/* ❔ */}
      <img
        className="SSR-AnswerImage"
        src={config.host + "/question_button.png"}
        style={({
          width: 90,
        })}
      // TODO: image src will change when a new answer is assigned
      // const imageURL = urlFor(imageRef).width(100).height(100).url();
      // if (imageURL === null) throw new Error("Unable to get url of image. Passed imageRef = " + imageRef);
      />
    </button>
  )
}

export const storyTextContainerClassname = "SSR-StoryTextContainer";

const StoryTextWithSlots = (props: Props) => {
  const { textSnippets } = props;

  const containerStyle: CSSProperties = {
    margin: 10,
    padding: 8,
    backgroundColor: "white"
  };

  return (
    <div className={storyTextContainerClassname} style={containerStyle} >
      {
        textSnippets.map((text, index) =>
          <span style={({ marginRight: 3 })}>
            <p
              style={textElementStyle}
            >
              {text}
            </p>
            { // logic for empty or selected answer
              true ?
                answerInput("", index) :
                null
            }
          </span>
        )
      }
    </div>
  )
}

export default (contentOptionButtonProps: Props) => ReactDOMServer.renderToString(StoryTextWithSlots(contentOptionButtonProps));