console.log("server script received");

// CSS needs to be imported to be bundled
import "./gameElementsStylesheet.css"

import elementsFunctions from "../functions";

let observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    console.log("Mutation Detected: ");
    // Overwriting mutations Node type
    mutation.addedNodes.forEach((newNode:HTMLElement) => {
      console.log(newNode)
      // const SSRButtons = document.querySelectorAll("button.SSRElement[react-type='button']");
      if (newNode.classList.contains("SSRElement") && newNode.getAttribute("react-type") === "button")
        newNode.addEventListener("click", () => elementsFunctions.exampleButtonCallback({ data: "mounted-test" }))
    });
  }
});
const observerOptions = {
  childList: true,
  attributes: true,
  subtree: true //Omit or set to false to observe only changes to the parent node.
};
const targetNode = document.getElementById("game")
if (!targetNode) console.error("target node not found");
observer.observe(targetNode, observerOptions);

console.log("server script finished");