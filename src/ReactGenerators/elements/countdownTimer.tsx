import React, { CSSProperties } from "react";
import ReactDOMServer from "react-dom/server";

export const countdownContainerClassname = "SSR-Countdown"
export const countdownTimeClassname = "SSR-Countdown";

const CountdownTimer = () => {
  const containerStyle: CSSProperties = {
    display: "inline",
    float: "right",
    padding: 2,
    margin: 8,
  };

  return (
    <div className={countdownContainerClassname + " card"} style={containerStyle}>
      {`Iki pabaigos liko: `}
      <span className={countdownTimeClassname} style={({ marginRight: 3 })}>
        ⏳
      </span>
    </div>
  )
}

export const countdown = (countdownTimerElement: Element) => {
  let secondsRemaining = 10 * 60 - 2; // 10 mins

  let intervalTimer;
  intervalTimer = setInterval(() => {
    secondsRemaining -= 1;

    countdownTimerElement.innerHTML = `${
      Math.floor(secondsRemaining / 60)
    }:${
      String(secondsRemaining % 60).padStart(2, "0")
    }`
    if (secondsRemaining <= 0) {
      clearInterval(intervalTimer)
    }
  }, 1000) // every second
}

export default () => ReactDOMServer.renderToString(CountdownTimer());