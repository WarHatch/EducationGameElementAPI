import { ISeqModel } from "../sequelize.d"

export interface ISession extends ISeqModel {
  sessionId: string,
  callbackAddress: string,
  finishedAt: string | null,
}