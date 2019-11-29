interface IGameElement {
  slug: string,
  html: string,
}

interface IClickableGameElement extends IGameElement {
  onClick: string,
}

interface IGameUnitDataSet<T extends IGameElement> {
  gameElements: Array<T>,
  css: any, //{ [className: string]: string },
} 