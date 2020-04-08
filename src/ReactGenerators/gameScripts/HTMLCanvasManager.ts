// TODO: see if it makes sense to find the HTMLCanvas once here (on import)

const edugameHTMLCanvasId = "#htmlcanvas-edugame-script-0";

export const getHTMLCanvasElement = () => {
  const HTMLCanvas = document.getElementById(edugameHTMLCanvasId);
  if (HTMLCanvas == null) throw new Error(`element with id "${edugameHTMLCanvasId}" is missing`);
  return HTMLCanvas;
} 

export const appendToGame = (element: ChildNode) => {
  const gameHTMLCanvas = getHTMLCanvasElement();
  gameHTMLCanvas.appendChild(element);
};
