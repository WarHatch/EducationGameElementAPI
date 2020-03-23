import Axios from "axios";
import config from "../config";
import { IAsteroidSessionConfig } from "../database/models/AsteroidSessionConfig";
import { ILesson } from "../database/models/Lesson";

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
  const { data } = await Axios.post<IAsteroidSessionConfig>(`${config.host}/lesson/${lessonId}/session/config`, payload);
  return data;
}

export const getLesson = async (lessonId: string, payload) => {
  const { data } = await Axios.post<ILesson>(`${config.host}/lesson/`, payload);
  return data;
}