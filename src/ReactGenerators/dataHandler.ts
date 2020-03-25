import Axios from "axios";
import config from "../config";
import { IAsteroidSessionConfig } from "../database/models/AsteroidSessionConfig";
import { ILesson } from "../database/models/Lesson";
import { ISessionGameTypeConfigBase } from "../database/sequelize.d";

export interface IAnswer {
  _key: string,
  _type: "button",
  title: string,
  backgroundColor: string,
  disappears: boolean,
  trackable: boolean,
}

export type IAsteroidData = {
  correctAnswers: IAnswer[],
  incorrectAnswers: IAnswer[],
  quizTitle: string,
  explanation: string,
}

// TODO: modify endpoint
export const getCMSData = async () => {
  const { data } = await Axios.get<IAsteroidData[]>(config.host + "/gameElements/cms");
  return data[0];
}

export interface IContentAnswer {
  word: string,
  picture: {
    asset: {
      _ref: string,
      _type: string //"reference"
    }
  }
}

export interface ISentenceConstructorDataSet {
  _id: string,
  _type: string,
  contentSlug: {
    current: string
  }
  quizTitle: string,
  storyChunks: string[],
  answers: IContentAnswer[], //ordered answers
  badAnswers: IContentAnswer[],
}

export const getCMSDataSentenceConstructor = async (contentSlug: string) => {
  const { data } = await Axios.get<ISentenceConstructorDataSet[]>(config.host + "/gameElements/cms/sentenceConstructor/" + contentSlug);
  return data[0];
}

export const getSessionConfig = async (lessonId: string, payload: { sessionId: string }) => {
  const { data } = await Axios.post<ISessionGameTypeConfigBase>(`${config.host}/lesson/${lessonId}/session/config`, payload);
  return data;
}

export const getLesson = async (payload: { [key: string]: any }) => {
  const { data } = await Axios.post<ILesson>(`${config.host}/lesson/`, payload);
  return data;
}