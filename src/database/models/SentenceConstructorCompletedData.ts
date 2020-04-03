import { ISeqModel } from "../sequelize.d"

export interface ISentenceConstructorCompletedDataModel extends ISeqModel {
  sessionId: string
  spawnToClickTime: number
  attemptedAnswerString: string
  correctPercentage: number | null,
}

export default (sequelize, type) => {
  return sequelize.define("sentenceConstructorCompletedData", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    spawnToClickTime: {
      type: type.INTEGER,
      allowNull: false,
    },

    attemptedAnswerString: {
      type: type.STRING,
      allowNull: false,
    },
    correctPercentage: {
      type: type.FLOAT,
      allowNull: true,
    },
  })
}
