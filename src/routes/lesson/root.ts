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
    const dbData = SeqDataModels.Lesson.create(lessonCreateData);
    const lesson: ILesson = await dbData;

    res.status(200).json(lesson);
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "Error while trying to fetch data",
    });
    return
  }
});

export default router;