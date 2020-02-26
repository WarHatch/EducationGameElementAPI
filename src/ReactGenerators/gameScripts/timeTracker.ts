let instanceCount = 0;
const timerStarts: Date[] = [];

const startTimer = () => {
  timerStarts[instanceCount] = new Date();
  instanceCount += 1;

  return instanceCount-1;
}

const checkTimer = (instanceId: number) => {
  // @ts-ignore Date - Date operations work as expected
  return new Date() - timerStarts[instanceId];
}

export default {
  checkTimer,
  startTimer,
}