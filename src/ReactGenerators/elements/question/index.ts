import question from "./question"
import Axios, { AxiosResponse } from "axios";

interface IAsteroidDataSet {
  // correctAnswers: IAnswer[],
  // incorrectAnswers: IAnswer[],
  quizTitle: string,
}

export default async () => {
  const dataQuery: AxiosResponse<IAsteroidDataSet> = await Axios.get("http://localhost:8090/gameElements/cms");
  const { data } = dataQuery;
  const { quizTitle } = data[0];

  return {
    html: question({
      quizTitle,
    })
  }
}
