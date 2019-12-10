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

let observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Mutation Detected");
  }
});

const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true //Omit or set to false to observe only changes to the parent node.
};

// FIXME: Research: ensure that elements have been received before executing function-bundle script
setTimeout(() => {
  const targetNodes = document.getElementsByClassName("edugame-white s-4")
  console.log(targetNodes[0]);
  observer.observe(targetNodes[0], observerOptions);
  
  console.log("server script finished");
}, 2000);
