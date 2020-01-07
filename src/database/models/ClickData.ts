import { ISeqModel } from "../sequelize.d"

export interface IClickDataModel extends ISeqModel {
  sessionId: string,
  reactionTime: number,
  correct: boolean,
  question: string,
}

export default (sequelize, type) => {
  return sequelize.define("clickData", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reactionTime: {
      type: type.INTEGER,
      allowNull: false,
    },
    correct: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    question: {
      type: type.STRING,
      allowNull: false,
    }
  })
}
