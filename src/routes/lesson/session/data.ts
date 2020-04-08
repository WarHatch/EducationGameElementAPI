import { Router } from "express";
import SeqDataModels from "../../../database/sequelize";
// import { countAverageReactionTime, countPercentCorrect } from "../../../routeDataParsing";

// Types
import { ISession } from "../../../database/models/Session";
import { IAsteroidSessionConfig } from "../../../database/models/AsteroidSessionConfig";

export type ISessionDataRequestModel = {
  sessionId: string,
}

const router = Router();

router.post("/data", async (req, res) => {
  // const { body } = req;

  // const { sessionId }: ISessionDataRequestModel = body;
  // try {
  //   const dbData = await SeqDataModels.Session.findOne({
  //     where: {
  //       sessionId
  //     },

  //     include: [
  //       { model: SeqDataModels.AsteroidClickData }
  //     ]
  //   });
  //   const { asteroidClickData }: ISession = dbData;
  //   if (asteroidClickData === undefined) throw new Error("dbData.asteroidClickData is undefined");
  //   const { correctPercentage, incorrectPercentage } = countPercentCorrect(asteroidClickData);
  //   const responseBody = {
  //     averageReactionTime: countAverageReactionTime(asteroidClickData),
  //     correctPercentage,
  //     fullData: dbData,
  //     incorrectPercentage,
  //   }
  //   res.status(200).json(responseBody);
  // } catch (error) {
  //   console.error(error);
  //   res.status(400).send("Error while trying to fetch data");
  // }
  res.status(410).send("Data analytics are no longer handled on the server. " +
    "averageReactionTime, correctPercentage should be counted on the client side")
});

export default router;