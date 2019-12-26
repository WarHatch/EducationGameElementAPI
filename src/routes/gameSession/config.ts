import { Router } from "express";
import SeqDataModels from "../../database/sequelize";

// Types
import { ISession } from "../../database/models/Session.d";

export type ISessionDataRequestModel = {
  sessionId: string,
}

const { Session, SessionConfig } = SeqDataModels;

const router = Router();

// get the most recent config
router.post("/config", async (req, res) => {
  const { body } = req;
  const { sessionId } = body;
  try {
    const dbData = await Session.findOne({
      where: {
        sessionId
      },
      include: [
        { model: SessionConfig }
      ],
      order: [
        [SessionConfig, "createdAt", "DESC"],
      ]
    });
    const { sessionConfigs }: ISession = dbData;
  
    res.status(201).json(sessionConfigs[0]);
  } catch (error) {
    res.status(400).json({
      message: "Error while trying to fetch config",
      error: error,
    });
    return
  }
});

// Set new config
router.post("/config/new", async (req, res) => {
  const { body } = req;
  res.status(500).json({
    message: "NOT IMPLEMENTED",
  });
});

export default router;