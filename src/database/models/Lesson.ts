import { ISeqModel } from "../sequelize.d"

export interface ILesson extends ISeqModel {
  teacherId: string,
  gameTypeJSON: string,
}

// tslint:disable: object-literal-sort-keys
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
    gameTypeJSON: {
      type: type.STRING,
      allowNull: false,
    }
  })
}

export default (sequelize, type, hasMany: { [key: string]: any }) => {
  const LessonModel = Lesson(sequelize, type);
  for (const modelKey in hasMany) {
    if (hasMany.hasOwnProperty(modelKey)) {
      const model = hasMany[modelKey];
      LessonModel.hasMany(model, {foreignKey: "lessonId"})
    }
  }

  return LessonModel
}
