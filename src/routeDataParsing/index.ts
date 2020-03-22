

// Types
import { IAsteroidClickDataModel } from "../database/models/AsteroidClickData";

export const countPercentCorrect = (sessionData: IAsteroidClickDataModel[]) => {
  const dataEntryCount = sessionData.length;

  let correctCount = 0;
  sessionData.forEach(entry => {
    if (entry.correct)
      correctCount += 1;
  });

  const correctPercentage = correctCount / dataEntryCount * 100;
  const incorrectPercentage = 100 - correctPercentage;

  return {
    correctPercentage,
    incorrectPercentage,
  }
}

export const countAverageReactionTime = (sessionData: IAsteroidClickDataModel[]) => {
  const dataEntryCount = sessionData.length;

  let reactionTime = 0;
  sessionData.forEach(entry => {
    reactionTime += entry.reactionTime;
  });

  return reactionTime / dataEntryCount;
}
