import { ISeqModel } from "../sequelize.d"
import { IClickDataModel } from "./ClickData.d";
import { ISessionConfig } from "./SessionConfig";

export interface ISession extends ISeqModel {
  sessionId: string,
  finishedAt: string | null,
  clickData?: IClickDataModel[],
  sessionConfig?: ISessionConfig[],
}