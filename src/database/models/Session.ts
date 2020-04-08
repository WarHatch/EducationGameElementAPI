import { ISeqModel } from "../sequelize.d"
import { IAsteroidClickDataModel } from "./AsteroidClickData";
import { ISentenceConstructorClickDataModel } from "./SentenceConstructorClickData";
import { IAsteroidSessionConfig } from "./AsteroidSessionConfig";
import { ISentenceConstructorConfig } from "./SentenceConstructorConfig";

export interface ISession extends ISeqModel {
  sessionId: string,
  finishedAt: string | null,
  asteroidSessionConfigs?: IAsteroidSessionConfig[],
  sentenceConstructorConfigs?: ISentenceConstructorConfig[],
  asteroidClickData?: IAsteroidClickDataModel[],
  sentenceConstructorClickData?: ISentenceConstructorClickDataModel[],
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

export default (sequelize, type, hasManyTables: { [key: string]: any }) => {
  const SessionModel = Session(sequelize, type);
  for (const tableKey in hasManyTables) {
    if (hasManyTables.hasOwnProperty(tableKey)) {
      const table = hasManyTables[tableKey];
      SessionModel.hasMany(table, {foreignKey: "sessionId", allowNull: false })
    }
  }

  return SessionModel
}
