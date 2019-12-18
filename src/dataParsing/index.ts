

// Types
import { IClickDataModel } from "../database/models/ClickData.d";

export const countPercentCorrect = (sessionData: IClickDataModel[]) => {
  const dataEntryCount = sessionData.length;

  let correctCount = 0;
  sessionData.forEach(entry => {
    if (entry.correct)
      correctCount += 1;
  });

  const correctPercentage = correctCount/dataEntryCount * 100;
  const incorrectPercentage = 100 - correctPercentage;

  return {
    correctPercentage,
    incorrectPercentage,
  }
}

export const countAverageReactionTime = (sessionData: IClickDataModel[]) => {
  const dataEntryCount = sessionData.length;

  let reactionTime = 0;
  sessionData.forEach(entry => {
    reactionTime += entry.reactionTime;
  });

  return reactionTime / dataEntryCount;
}