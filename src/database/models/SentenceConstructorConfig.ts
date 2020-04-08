import { ISessionGameTypeConfigBase } from "../sequelize.d"

export interface ISentenceConstructorConfig extends ISessionGameTypeConfigBase {
  hintMessage?: string,
  nextContentSlug?: string,
}

export default (sequelize, type) => {
  return sequelize.define("sentenceConstructorConfig", {
    id: {
      type: type.INTEGER,

      primaryKey: true,
      autoIncrement: true
    },
    hintMessage: {
      type: type.STRING(510),
      allowNull: true,
    },
    nextContentSlug: {
      type: type.STRING,
      allowNull: true,
    },
    // remove updatedAt
  })
}
