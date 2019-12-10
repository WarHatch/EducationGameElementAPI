console.log("server script received");

import arrive from "arrive";

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"
import elementsFunctions from "../functions";

// Mount functions onto HTML (consider using `window`?)
// @ts-ignore
document.exampleButtonCallback = elementsFunctions.exampleButtonCallback;
// FIXME: Expose global functions?
// https://webpack.js.org/guides/shimming/#exports-loader

// document.arrive("[react-type='button']", function() {
//   // 'this' refers to the newly created element
//   this.onClick(() => elementsFunctions.exampleButtonCallback({"data":"mount-code server data"}))
// });

console.log("server script finished");
