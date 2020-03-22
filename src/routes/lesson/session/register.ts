import { Router } from "express";
import SeqDataModels from "../../../database/sequelize";
import { asteroid as asteroidConfig } from "../../../ReactGenerators/configs/gameConfigs"

// Types
import { IAsteroidClickDataModel } from "../../../database/models/AsteroidClickData";
import { ISession } from "../../../database/models/Session";

const router = Router();

router.post("/register", async (req, res) => {
  const startData: ISession = req.body;

  try {
    await SeqDataModels.Session.upsert(startData);


    // Find the lesson by id to extract gameType
    const parentLesson = await SeqDataModels.Lesson.findOne(
      {
        where: { id: startData.lessonId },
      }
    );
    const { gameType } = parentLesson;

    // by gameType determine which sessionConfig should be used
    if (gameType === "asteroid") {
      await SeqDataModels.SessionConfig.upsert({
        asteroidSecondsToCrash: asteroidConfig.defaultSessionConfig.asteroidSecondsToCrash,
        asteroidSpawnPerMinute: asteroidConfig.defaultSessionConfig.asteroidSpawnPerMinute,
        sessionId: startData.sessionId,
        gameType,
      });
      // Fetch what was created
      const createdSession = await SeqDataModels.Session.findOne(
        {
          where: { sessionId: startData.sessionId },

          include: [
            { model: SeqDataModels.SessionConfig }
          ]
        }
      );
      res.status(201).json(createdSession);
    } else if (gameType === "sentenceConstructor") {
      // await SeqDataModels.SentenceConstructorSessionConfig.upsert({
      //   ...
      //   sessionId: startData.sessionId,
      //   gameType,
      // });

      // Fetch what was created
      // const createdSession = await SeqDataModels.Session.findOne(
      //   {
      //     where: { sessionId: startData.sessionId },

      //     include: [
      //       { model: SeqDataModels.SentenceConstructorSessionConfig }
      //     ]
      //   }
      // );
      // res.status(201).json(createdSession);

      res.status(501);
    } else {
      res.status(422).send("gameType should be 'asteroid' or 'serviceConstructor'. Received: " + gameType);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to create/update a session in database");
  }
});

interface IEndSessionData {
  sessionId: string,
  finishedAt: string,
}

router.post("/register/end", async (req, res) => {
  const endData: IEndSessionData = req.body;

  try {
    await SeqDataModels.Session.update(endData,
      {
        where: { sessionId: endData.sessionId }
      }
    );
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to update an entry in database");
  }
});

// FIXME: assume multiple clickData tables
router.post("/register/buttonClick", async (req, res) => {
  const asteroidClickData: IAsteroidClickDataModel = req.body;

  try {
    await SeqDataModels.AsteroidClickData.create(asteroidClickData);
    res.status(201).send();
  } catch (error) {
    console.error(error)
    res.status(400).send("Error while trying to create an entry in database");
  }
});

export default router;