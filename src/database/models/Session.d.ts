import { ISeqModel } from "../sequelize.d"
import { IClickDataModel } from "./ClickData.d";

export interface ISession extends ISeqModel {
  sessionId: string,
  finishedAt: string | null,
  clickData?: IClickDataModel[],
}