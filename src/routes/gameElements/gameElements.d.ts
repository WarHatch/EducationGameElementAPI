interface IGameElement {
  slug: string,
  html: string,
}

interface IGameUnitDataSet<T extends IGameElement> {
  gameElements: Array<T>,
  css: any,
} 