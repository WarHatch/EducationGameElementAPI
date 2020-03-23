import { ISeqModel } from "../sequelize.d"

export interface ISentenceConstructorClickDataModel extends ISeqModel {
  sessionId: string
  correct: boolean
  startToClickTime: number
  attemptedAnswer: string
  attemptedSlotNumber: string
}

export default (sequelize, type) => {
  return sequelize.define("sentenceConstructorClickData", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    startToClickTime: {
      type: type.INTEGER,
      allowNull: false,
    },
    correct: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    attemptedAnswer: {
      type: type.STRING,
      allowNull: false,
    },
    attemptedSlotNumber: {
      type: type.INTEGER,
      allowNull: false,
    }
  })
}
