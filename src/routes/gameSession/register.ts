import { Router } from "express";
import SeqDataModels from "../../database/sequelize"; 

// Types
import { IClickDataModel } from "../../database/models/ClickData.d";
import { ISession } from "../../database/models/Session.d";

const router = Router();

router.post("/register", async (req, res) => {
  const startData: ISession = req.body;
  console.log("Received start session data:");
  console.log(startData);

  try {
    await SeqDataModels.Session.upsert(startData);
    await SeqDataModels.SessionConfig.upsert(startData.sessionConfigs[0] || startData.sessionConfigs);
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