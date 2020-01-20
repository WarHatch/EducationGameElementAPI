export interface ICanvasConfig {
  width: number;
  height: number;
  questionWidth: number;
}

const canvasDimensions: ICanvasConfig[] = [
  // Medium devices (tablets, 768px and up)
  {
    width: 750,
    height: 600,
    questionWidth: 300,
  },
  // Large devices (desktops, 992px and up)
  {
    width: 1024,
    height: 768,
    questionWidth: 300,
  },
  // Extra large devices (large desktops, 1200px and up)
  {
    width: 1300,
    height: 830,
    questionWidth: 300,
  },
]

const getMatchingCanvasConfig = (windowWidth: number): ICanvasConfig => {
  // return last smaller canvas
  for (let sizeIndex = 1; sizeIndex < canvasDimensions.length; sizeIndex++) {
    const lastSize = canvasDimensions[sizeIndex -1];
    const canvasSize = canvasDimensions[sizeIndex];
    if (canvasSize.width > windowWidth)
      return lastSize;
  }
  // last/biggest option
  return canvasDimensions[canvasDimensions.length -1];
}

export default getMatchingCanvasConfig;