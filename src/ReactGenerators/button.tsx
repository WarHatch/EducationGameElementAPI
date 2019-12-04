import React from "react";
import ReactDOMServer from "react-dom/server";

export type IButtonData = {
  _key: string,
  _type: "button",
  title: string,
  backgroundColor: string,
  disappears: boolean,
  trackable: boolean,
}

type Props = IButtonData

const Button = (props: Props) => {
  const buttonData = props;
  return (
    <>
      <button
        id={buttonData._key}
        className={`edugame-${buttonData.backgroundColor} s-4`}
        // Room for onClick :)
      >
        {buttonData.title}
      </button>
    </>
  )
}

const renderToHTMLWithFunctions = (props: IButtonData) => {
  console.log(props);
  const html = ReactDOMServer.renderToStaticMarkup(Button(props));
  // Assuming HTML is correct the string will be <elemType ...
  const elemStart = html.split(/\b/)[0] + html.split(/\b/)[1];
  // We will separate HTML text right after elemType
  const elemEnd = html.substring(elemStart.length);
  // And will put in the functions in between
  const functionCodeStart = " onClick=\""
  const functionCodeEnd = "\" "
  const trackableFunc = "console.log('I should send back a report after being clicked');"
  const dissapearsFunc = `document.getElementById('${props._key}').remove();`
  let htmlWithFunc = functionCodeStart;

  if (props.trackable) htmlWithFunc += trackableFunc;
  console.log(htmlWithFunc);

  console.log(props.disappears);
  if (props.disappears) htmlWithFunc += dissapearsFunc;
  console.log(htmlWithFunc);

  htmlWithFunc += functionCodeEnd;
  console.log(htmlWithFunc);
  
  return elemStart + htmlWithFunc + elemEnd;
}

export default (buttonData: IButtonData) => renderToHTMLWithFunctions(buttonData);;