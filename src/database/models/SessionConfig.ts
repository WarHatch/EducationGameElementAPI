import { ISeqModel } from "../sequelize.d"

export interface ISessionConfig extends ISeqModel {
  sessionId: string,
  asteroidSpawnPerMinute: number,
}

export default (sequelize, type) => {
  return sequelize.define("sessionConfig", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    speed: {
      type: type.INTEGER,
      allowNull: false,
    }
    // remove updatedAt
  })
}
