import { ISeqModel } from "../sequelize.d"
import { IClickDataModel } from "./ClickData";
import { ISessionConfig } from "./SessionConfig";

export interface ISession extends ISeqModel {
  sessionId: string,
  finishedAt: string | null,
  clickData?: IClickDataModel[],
  sessionConfigs?: ISessionConfig[],
  lessonId: string,
}

const Session = (sequelize, type) => {
  return sequelize.define("session", {
    sessionId: {
      type: type.UUID,

      primaryKey: true,
    },

    finishedAt: {
      type: type.DATE,

      allowNull: true,
    }
  })
}

export default (sequelize, type, hasMany: { [key: string]: any }) => {
  const SessionModel = Session(sequelize, type);
  SessionModel.hasMany(hasMany.ClickData, { foreignKey: "sessionId", allowNull: false })
  SessionModel.hasMany(hasMany.SessionConfig, { foreignKey: "sessionId", allowNull: false })
  
  return SessionModel
}
