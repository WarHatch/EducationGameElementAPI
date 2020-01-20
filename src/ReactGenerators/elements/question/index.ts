import question from "./question"
import Axios, { AxiosResponse } from "axios";

interface IAsteroidDataSet {
  // correctAnswers: IAnswer[],
  // incorrectAnswers: IAnswer[],
  quizTitle: string,
  explanation: string,
}

interface Props {
  conteinerHeight: number,
  width: number,
}

export default async (props: Props) => {
  const { conteinerHeight, width } = props;

  const dataQuery: AxiosResponse<IAsteroidDataSet> = await Axios.get("http://localhost:8090/gameElements/cms");
  const { data } = dataQuery;
  const { quizTitle, explanation } = data[0];

  return {
    html: question({
      explanation,
      quizTitle,
      conteinerHeight,
      width,
    })
  }
}
