export interface ICanvasConfig {
  width: number;
  height: number;
}

const canvasDimensions: ICanvasConfig[] = [
  // Medium devices (tablets, 768px and up)
  {
    width: 750,
    height: 600,
  },
  // Large devices (desktops, 992px and up)
  {
    width: 1024,
    height: 768,
  },
  // Extra large devices (large desktops, 1200px and up)
  {
    width: 1300,
    height: 830,
  },
]

const getMatchingCanvasConfig = (windowWidth: number): ICanvasConfig => {
  for (let sizeIndex = 0; sizeIndex < canvasDimensions.length; sizeIndex++) {
    const canvasSize = canvasDimensions[sizeIndex];
    if (canvasSize.width > windowWidth)
      return canvasSize;
  }
  // last/biggest option
  return canvasDimensions[canvasDimensions.length -1];
}

export default getMatchingCanvasConfig;