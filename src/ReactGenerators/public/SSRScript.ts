console.log("server script received");

// import arrive from "arrive";

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"
import elementsFunctions from "../functions";

const exampleButtonCallback = (data) => elementsFunctions.exampleButtonCallback(data);

// Mount functions onto HTML (consider using `window`)
// @ts-ignore
document.exampleButtonCallback = exampleButtonCallback;

// Function mounting
// document.arrive("[react-type='button']", function() {
//   // 'this' refers to the newly created element
//   this.onClick(() => exampleButtonCallback({"data":"mount-code server data"}))
// });

console.log("server script finished");
