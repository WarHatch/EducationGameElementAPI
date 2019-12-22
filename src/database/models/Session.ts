import { Sequelize } from "sequelize/types"

import ClickData from "./ClickData"

const Session = (sequelize, type) => {
  return sequelize.define("session", {
    sessionId: {
      type: type.UUID,
      primaryKey: true,
    },
    callbackAddress: {
      type: type.STRING,
      allowNull: false,
    },
    finishedAt: {
      type: type.DATE,
      allowNull: true,
    }
  })
}

const connectedModel = (sequelize, type) =>
  Session(sequelize, type).hasMany(ClickData(sequelize, type), { foreignKey: "sessionId" })


export default connectedModel;
