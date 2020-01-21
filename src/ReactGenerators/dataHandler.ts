import Axios from "axios";
import config from "../config";
import { ISessionConfig } from "../database/models/SessionConfig";

export interface IAnswer {
  _key: string,
  _type: "button",
  title: string,
  backgroundColor: string,
  disappears: boolean,
  trackable: boolean,
}

export type IAsteroidDataSet = Array<{
  correctAnswers: IAnswer[],
  incorrectAnswers: IAnswer[],
  quizTitle: string,
  explanation: string,
}>

export const getCMSData = async () => {
  const { data } = await Axios.get<IAsteroidDataSet>(config.host + "/gameElements/cms");
  return data[0];
}

export const getSessionConfig = async (lessonId: string, payload: {sessionId: string}) => {
  const { data } = await Axios.post<ISessionConfig>(`${config.host}/lesson/${lessonId}/session/config`, payload);
  return data;
}