import React from "react";
import ReactDOMServer from "react-dom/server";

import functions from "../functions"

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
  return (
    <>
      <button
        react-type={props._type}
        className={`SSRElement SSR-${props.backgroundColor}`}
        //onClick mounted after ReactDOMServer render
      >
        {props.title}
      </button>
    </>
  )
}

// type IHtmlFunctionCallBuilder<T extends (...args: any) => void> = (func: T, funcArgs: Parameters<T>) => string
// const htmlFunctionCallBuilder: IHtmlFunctionCallBuilder<(...args: any) => void> = (func, funcArgs) => {
//   let parsedArgs = JSON.stringify(funcArgs);
//   return `${func.name}(${parsedArgs});`
// }
// const renderToHTMLWithFunctions = (props: IButtonData) => {
//   const html = ReactDOMServer.renderToString(Button(props));
//   // Assuming HTML is correct the string will be <elemType ...
//   const elemStart = html.split(/\b/)[0] + html.split(/\b/)[1];
//   // We will separate HTML text right after elemType
//   const elemEnd = html.substring(elemStart.length);
//   // And will put in the functions in between
//   const functionCodeStart = " onClick=\'"
//   const functionCodeEnd = "\' "
//   // const dissapearsFunc = `document.getElementById('${props._key}').remove();`
//   let htmlWithFunc = functionCodeStart;
//   if (props.trackable) htmlWithFunc += htmlFunctionCallBuilder(functions.exampleButtonCallback, { data: "test" });
//   // if (props.disappears) htmlWithFunc += dissapearsFunc;
//   htmlWithFunc += functionCodeEnd;
//   return elemStart + htmlWithFunc + elemEnd;
// }

export default (buttonData: IButtonData) => ReactDOMServer.renderToString(Button(buttonData));