import { Router } from "express";

import SeqDataModels from "../../database/sequelize";
import { ILesson } from "../../database/models/Lesson";

export interface ILessonCreateData {
  lessonId: string,
  teacherId: string,
  gameType: {
    type: "asteroid",
    // TODO: add more config
  },
}

const router = Router();

router.post("/new", async (req, res) => {
  const { body } = req;
  const { id, teacherId, gameType } = body;

  const lessonCreateData = {
    id,
    teacherId,

    gameTypeJSON: JSON.stringify(gameType)
  }
  try {
    const lesson: ILesson = await SeqDataModels.Lesson.create(lessonCreateData);

    res.status(200).json(lesson);
  } catch (error) {
    console.log(error);
    const duplicateLesson = await SeqDataModels.Lesson.findOne({
      where: {
        id
      }
    });
    if (duplicateLesson) {
      // TODO: res.status(409)
      return res.json({
        error,
        message: "Lesson with that id already exists",
        status: 409,
      });
    }
    return res.status(400).json(error);
  }
});

router.post("/", async (req, res) => {
  const { body } = req;
  
  // Build query from body
  const lessonQuery = {};
  Object.keys(body).forEach(bodyPropKey => lessonQuery[bodyPropKey] = body[bodyPropKey]);

  try {
    const lesson: ILesson = await SeqDataModels.Lesson.findOne({
      where: lessonQuery,
      include: [
        { model: SeqDataModels.Session }
      ],
      order: [
        [SeqDataModels.Session, "createdAt", "DESC"],
      ]
    });

    res.status(200).json(lesson);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

export default router;