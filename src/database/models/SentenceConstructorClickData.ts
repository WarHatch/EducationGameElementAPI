import { ISeqModel } from "../sequelize.d"

export interface ISentenceConstructorClickDataModel extends ISeqModel {
  sessionId: string
  correct: boolean | null
  spawnToClickTime: number
  attemptedAnswer: string
  attemptedSlotNumber: number | null
}

export default (sequelize, type) => {
  return sequelize.define("sentenceConstructorClickData", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    spawnToClickTime: {
      type: type.INTEGER,
      allowNull: false,
    },
    correct: {
      type: type.BOOLEAN,
      allowNull: true,
    },
    attemptedAnswer: {
      type: type.STRING,
      allowNull: false,
    },
    attemptedSlotNumber: {
      type: type.INTEGER,
      allowNull: true,
    }
  })
}
