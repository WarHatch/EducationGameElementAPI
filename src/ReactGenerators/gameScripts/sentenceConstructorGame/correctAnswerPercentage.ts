/**
 * @param attemptedAnswersString e.g. "2 -1 -1 1 "
 */
export default (attemptedAnswersString: string) => {
  // Protects against division by 0
  if (attemptedAnswersString.length === 0)
    return null;

  attemptedAnswersString = attemptedAnswersString.trimRight();
  const attemptedAnswersArr = attemptedAnswersString.split(" ");

  let correctAnswers = 0;
  for (let i = 0; i < attemptedAnswersArr.length; i++) {
    const answerIndex = attemptedAnswersArr[i];
    if (Number(answerIndex) === i) correctAnswers++;
  }
  return correctAnswers / attemptedAnswersArr.length * 100;
}