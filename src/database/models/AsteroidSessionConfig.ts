import { ISessionGameTypeConfigBase } from "../sequelize.d"

export interface IAsteroidSessionConfig extends ISessionGameTypeConfigBase {
  asteroidSpawnPerMinute: number,
  asteroidSecondsToCrash: number,
}

export default (sequelize, type) => {
  return sequelize.define("asteroidSessionConfig", {
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
