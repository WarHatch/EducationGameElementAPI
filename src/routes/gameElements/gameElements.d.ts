interface IGameElement {
  slug: string,
  html: string,
}

interface IClickableGameElement extends IGameElement {
  onClick: VoidFunction
}

interface IGameUnitDataSet {
  gameElements: Array<IGameElement>,
  css: any, //{ [className: string]: string },
} 