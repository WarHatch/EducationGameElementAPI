import { ISeqModel } from "../sequelize.d"

export interface ILesson extends ISeqModel {
  teacherId: string,
  contentSlug: string,
  gameType: string,
  gameContentJSON: string
}

const Lesson = (sequelize, type) => {
  return sequelize.define("lesson", {
    id: {
      type: type.STRING,
      primaryKey: true,
    },
    teacherId: {
      type: type.STRING,
      allowNull: false,
    },
    contentSlug: {
      type: type.STRING,
      allowNull: false,
    },
    gameType: {
      type: type.STRING,
      allowNull: false,
    },
    gameContentJSON: {
      type: type.JSON,
      allowNull: true,
    }
  })
}

export default (sequelize, type, hasManyTables: { [key: string]: any }) => {
  const LessonModel = Lesson(sequelize, type);
  for (const tableKey in hasManyTables) {
    if (hasManyTables.hasOwnProperty(tableKey)) {
      const table = hasManyTables[tableKey];
      LessonModel.hasMany(table, {foreignKey: "lessonId"})
    }
  }

  return LessonModel
}
