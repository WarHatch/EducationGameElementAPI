import question from "./question"
import { getCMSData } from "../../dataHandler";

interface Props {
  conteinerHeight: number,
  width: number,
}

export default async (props: Props) => {
  const { conteinerHeight, width } = props;

  const { quizTitle, explanation } = await getCMSData();

  return {
    html: question({
      explanation,
      quizTitle,
      conteinerHeight,
      width,
    })
  }
}
