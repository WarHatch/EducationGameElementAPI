import { ISeqModel } from "../sequelize.d"

export interface IClickDataModel extends ISeqModel {
  sessionId: string,
  reactionTime: number,
  correct: boolean,
  question: string,
}
