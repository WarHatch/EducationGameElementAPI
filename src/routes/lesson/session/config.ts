import { Router } from "express";
import SeqDataModels from "../../../database/sequelize";

// Types  
import { ISession } from "../../../database/models/Session";
import { IAsteroidSessionConfig } from "../../../database/models/AsteroidSessionConfig";
import { ISessionGameTypeConfigBase } from "../../../database/sequelize.d";
import { ISentenceConstructorConfig } from "../../../database/models/SentenceConstructorConfig";

export type ISessionDataRequestModel = {
  sessionId: string,
}

const { Session, AsteroidSessionConfig, SentenceConstructorConfig } = SeqDataModels;

const router = Router({mergeParams: true});

// get the most recent config (of any type)
router.post("/config", async (req, res) => {
  const { body } = req;
  const { sessionId } = body;
  try {
    const dbData: Required<ISession> = await Session.findOne({
      where: {
        sessionId
      },
      include: [
        { model: AsteroidSessionConfig },
        { model: SentenceConstructorConfig },
      ],
      order: [
        [AsteroidSessionConfig, "createdAt", "DESC"],
        [SentenceConstructorConfig, "createdAt", "DESC"],
      ]
    });

    const { asteroidSessionConfigs, sentenceConstructorConfigs } = dbData;
    if (asteroidSessionConfigs[0] === undefined) {
      if (sentenceConstructorConfigs[0] === undefined) {
        res.status(400).send({ message: "asteroidSessionConfigs & sentenceConstructorConfigs are undefined" });
      } else {
        res.status(200).json(sentenceConstructorConfigs[0]);
      }
    } else {
      res.status(200).json(asteroidSessionConfigs[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to fetch config");
  }
});

// TODO: change url
// Set new config for asteroid  
router.post("/config/new", async (req, res) => {
  const { body } = req;

  try {
    const dbResponse: Promise<IAsteroidSessionConfig> = await AsteroidSessionConfig.create(body);

    res.status(201).json(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to create asteroid config")
  }
});

// Set new config for sentenceConstructor
router.post("/config/new/sentenceConstructor", async (req, res) => {
  const { body } = req;

  try {
    const dbResponse: Promise<ISentenceConstructorConfig> = await SentenceConstructorConfig.create(body);

    res.status(201).json(dbResponse);
  } catch (error) {
    console.error(error);
    res.status(400).send("Error while trying to create sentenceConstructor config")
  }
});

export default router;