import { Router } from "express";
import SeqDataModels from "../../../database/sequelize";
import { asteroid as asteroidConfig } from "../../../ReactGenerators/configs/gameConfigs"

// Types
import { IClickDataModel } from "../../../database/models/ClickData";
import { ISession } from "../../../database/models/Session";
import { ISessionConfig } from "../../../database/models/SessionConfig";

const router = Router();

router.post("/register", async (req, res) => {
  const startData: ISession = req.body;

  try {
    await SeqDataModels.Session.upsert(startData);

    const sessionConfigDefaultPayload: ISessionConfig = {
      asteroidSecondsToCrash: asteroidConfig.defaultSessionConfig.asteroidSecondsToCrash,
      asteroidSpawnPerMinute: asteroidConfig.defaultSessionConfig.asteroidSpawnPerMinute,
      sessionId: startData.sessionId,
    }
    await SeqDataModels.SessionConfig.upsert(sessionConfigDefaultPayload);
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

router.post("/register/buttonClick", async (req, res) => {
  const clickData: IClickDataModel = req.body;

  try {
    await SeqDataModels.ClickData.create(clickData);
    res.status(201).send();
  } catch (error) {
    console.error(error)
    res.status(400).send("Error while trying to create an entry in database");
  }
});

export default router;