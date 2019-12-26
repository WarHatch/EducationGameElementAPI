import { Router } from "express";
import SeqDataModels from "../../database/sequelize";
import { lastCreated } from "../../dataParsing";

// Types
import { ISession } from "../../database/models/Session.d";

export type ISessionDataRequestModel = {
  sessionId: string,
}

const router = Router();

router.post("/config", async (req, res) => {
  const { body } = req;
  const { sessionId } = body;
  try {
    const dbData: ISession = await SeqDataModels.Session.findOne({
      where: {
        sessionId
      },
      include: [
        { model: SeqDataModels.SessionConfig }
      ]
    });
    const { sessionConfig } = dbData;

    const responseBody = {
      fullData: dbData,
      lastCreated: lastCreated(sessionConfig)
    }
    res.status(201).json(responseBody);
  } catch (error) {
    res.status(400).json({
      message: "Error while trying to fetch config",
      error: error,
    });
    return
  }
});

export default router;