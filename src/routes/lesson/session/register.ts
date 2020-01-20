import { Router } from "express";
import SeqDataModels from "../../../database/sequelize"; 
import {asteroid as asteroidConfig} from "../../../ReactGenerators/configs/gameConfigs"

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
    // FIXME: https://stackoverflow.com/questions/14154337/how-to-send-a-custom-http-status-message-in-node-express
    res.status(400).send("Error while trying to create/update a session in database");
    console.log(error);
  }
});

interface IEndSessionData {
  sessionId: string,
  finishedAt: string,
}

router.post("/register/end", async (req, res) => {
  const endData: IEndSessionData = req.body;
  console.log("Received end session data:");
  console.log(endData);
  
  try {
    await SeqDataModels.Session.update(endData,
      {
        where: { sessionId: endData.sessionId }
      }
    );
    res.status(204).send();
  } catch (error) {
    res.status(400).send("Error while trying to update an entry in database");
    console.log(error);
  }
});

router.post("/register/buttonClick", async (req, res) => {
  const clickData: IClickDataModel = req.body;
  console.log("Received data:");
  console.log(clickData);

  try {
    await SeqDataModels.ClickData.create(clickData);
    res.status(201).send();
  } catch (error) {
    res.status(400).send("Error while trying to create an entry in database");
  }
});

export default router;