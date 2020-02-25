import { Router } from "express";

import SeqDataModels from "../../database/sequelize";
import { ILesson } from "../../database/models/Lesson";

export interface ILessonCreateData {
  lessonId: string,
  teacherId: string,
  gameType: {
    type: "asteroid" | "assembly",
    // TODO: rely on types on EduGameManager/.../datahandler/data.d.ts
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
    console.error(error);
    const duplicateLesson = await SeqDataModels.Lesson.findOne({
      where: { id }
    });
    if (duplicateLesson) {
      res.status(409).send("Lesson with that id already exists");
    }
    return res.status(400).send("Unknown error while searching for lesson");
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
    console.error(error);
    return res.status(400).send("Error while finding lesson");
  }
});

export default router;