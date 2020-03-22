import { ISeqModel } from "../sequelize.d"
import { IAsteroidClickDataModel } from "./AsteroidClickData";
import { ISessionConfig } from "./SessionConfig";

export interface ISession extends ISeqModel {
  sessionId: string,
  finishedAt: string | null,
  asteroidClickData?: IAsteroidClickDataModel[],
  sessionConfigs?: ISessionConfig[],
  lessonId: string,
  playerName: string,
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
    },
    playerName: {
      type: type.STRING,
      allowNull: false,
    },
  })
}

export default (sequelize, type, hasMany: { [key: string]: any }) => {
  const SessionModel = Session(sequelize, type);
  SessionModel.hasMany(hasMany.AsteroidClickData, { foreignKey: "sessionId", allowNull: false })
  SessionModel.hasMany(hasMany.SessionConfig, { foreignKey: "sessionId", allowNull: false })

  return SessionModel
}
