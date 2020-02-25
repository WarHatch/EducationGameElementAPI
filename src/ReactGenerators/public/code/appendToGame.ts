export const appendToGame = (element: ChildNode, gameElement: Element) => {
  // @ts-ignore // FIXME: gameElement should have html canvas properties
  const gameHTMLCanvas: Element = gameElement.firstChild;
  gameHTMLCanvas.appendChild(element);
};
