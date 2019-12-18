let instanceCount = 0;
const timerStarts = [];

const startTimer = () => {
  timerStarts[instanceCount] = new Date();
  instanceCount += 1;

  return instanceCount-1;
}

const checkTimer = (instanceId: number) => {
  // @ts-ignore
  return new Date() - timerStarts[instanceId];
}

export default {
  startTimer,
  checkTimer,
}