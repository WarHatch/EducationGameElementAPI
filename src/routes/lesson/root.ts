import { Router } from "express";

import SeqDataModels from "../../database/sequelize";
import { ILesson } from "../../database/models/Lesson";
import { sentenceConstructorGameTypeName } from "../../ReactGenerators/public/EduSentenceConstructor";

interface ILessonCreate {
  id: string,
  teacherId: string,
  contentSlug: string,
}

interface ILessonCreateReqPayload extends ILessonCreate {
  gameType: "asteroid" | typeof sentenceConstructorGameTypeName,
}

const router = Router();

router.post("/new", async (req, res) => {
  const { body: lessonCreateData }: { body: ILessonCreateReqPayload} = req;

  try {
    const lesson: ILesson = await SeqDataModels.Lesson.create(lessonCreateData);
    res.status(200).json(lesson);
  } catch (error) {
    console.error(error);
    const duplicateLesson = await SeqDataModels.Lesson.findOne({
      where: { id: lessonCreateData.id }
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