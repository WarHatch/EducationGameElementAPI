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
    const duplicateLesson = await SeqDataModels.Lesson.findOne({
      where: {
        id
      }
    });
    if (duplicateLesson) {
      // TODO: unsure how to set status code and maintain message - https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express
      return res.json({
        error,
        message: "Lesson with that id already exists",
      });
    }
    return res.status(400).json(error);
  }
});

export default router;