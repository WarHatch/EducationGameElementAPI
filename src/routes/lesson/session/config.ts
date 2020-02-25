// tslint:disable: object-literal-sort-keys

import { Router } from "express";
import SeqDataModels from "../../../database/sequelize";

// Types  
import { ISession } from "../../../database/models/Session";
import { ISessionConfig } from "../../../database/models/SessionConfig";

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
    if (sessionConfigs === undefined) throw new Error("dbData.sessionConfigs is undefined");

    res.status(200).json(sessionConfigs[0]);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to fetch config");
  }
});

// Set new config
router.post("/config/new", async (req, res) => {
  const { body } = req;

  try {
    const dbResponse: Promise<ISessionConfig> = await SessionConfig.create(body);

    res.status(201).json(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to create config")
  }
});

export default router;