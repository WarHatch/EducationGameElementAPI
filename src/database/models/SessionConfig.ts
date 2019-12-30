import { ISeqModel } from "../sequelize.d"

export interface ISessionConfig extends ISeqModel {
  sessionId: string,
  asteroidSpawnPerMinute: number,
  asteroidSecondsToCrash: number,
}

// tslint:disable: object-literal-sort-keys
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
    }
    // remove updatedAt
  })
}
