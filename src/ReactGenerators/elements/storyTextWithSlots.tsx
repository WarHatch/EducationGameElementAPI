import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

// Classnames
import { SCContainerClassname } from "../observer/sentenceConstructorLogic";

import config from "../../config";

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
        // mounted: image src will change when a new answer is assigned
        style={({
          width: 90,
        })}
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
    backgroundColor: "white",
    overflow: "auto"
  };

  return (
    <div className={storyTextContainerClassname + " " + SCContainerClassname} style={containerStyle} >
      {
        textSnippets.map((text, index) =>
          <span style={({ marginRight: 3 })}>
            <p
              style={textElementStyle}
            >
              {text}
            </p>
            {
              index < textSnippets.length - 1 ?
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