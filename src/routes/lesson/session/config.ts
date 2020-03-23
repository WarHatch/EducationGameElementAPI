// tslint:disable: object-literal-sort-keys

import { Router } from "express";
import SeqDataModels from "../../../database/sequelize";

// Types  
import { ISession } from "../../../database/models/Session";
import { IAsteroidSessionConfig } from "../../../database/models/AsteroidSessionConfig";
import { ISessionGameTypeConfigBase } from "../../../database/sequelize.d";

export type ISessionDataRequestModel = {
  sessionId: string,
}

const { Session, AsteroidSessionConfig } = SeqDataModels;

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
        { model: AsteroidSessionConfig }
      ],
      order: [
        [AsteroidSessionConfig, "createdAt", "DESC"],
      ]
    });
    const { asteroidSessionConfigs } = dbData;
    if (asteroidSessionConfigs === undefined) throw new Error("dbData.sessionConfigs is undefined");

    res.status(200).json(asteroidSessionConfigs[0]);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to fetch config");
  }
});

// Set new config
router.post("/config/new", async (req, res) => {
  const { body } = req;

  try {
    const dbResponse: Promise<IAsteroidSessionConfig> = await AsteroidSessionConfig.create(body);

    res.status(201).json(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to create config")
  }
});

export default router;