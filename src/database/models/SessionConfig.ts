import { ISeqModel } from "../sequelize.d"

export interface ISessionConfig extends ISeqModel {
  sessionId: string,
  asteroidSpawnPerMinute: number,
  asteroidSecondsToCrash: number,
  gameType: string,
}

export default (sequelize, type) => {
  return sequelize.define("sessionConfig", {
    id: {
      type: type.INTEGER,

      primaryKey: true,
      autoIncrement: true
    },
    asteroidSpawnPerMinute: {
      type: type.INTEGER,
      allowNull: false,
    },
    asteroidSecondsToCrash: {
      type: type.INTEGER,
      allowNull: false,
    },
    gameType: {
      type: type.STRING,
      allowNull: false,
    }
    // remove updatedAt
  })
}
