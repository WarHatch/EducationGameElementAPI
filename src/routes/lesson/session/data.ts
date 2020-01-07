import { Router } from "express";
import SeqDataModels from "../../../database/sequelize";
import { countAverageReactionTime, countPercentCorrect } from "../../../dataParsing";

// Types
import { ISession } from "../../../database/models/Session";

export type ISessionDataRequestModel = {
  sessionId: string,
}

const router = Router();

router.post("/data", async (req, res) => {
  const { body } = req;

  const { sessionId }: ISessionDataRequestModel = body;
  try {
    const dbData = await SeqDataModels.Session.findOne({
      where: {
        sessionId
      },

      include: [
        { model: SeqDataModels.ClickData }
      ]
    });
    const { clickData }: ISession = dbData;

    const { correctPercentage, incorrectPercentage } = countPercentCorrect(clickData);
    const responseBody = {
      averageReactionTime: countAverageReactionTime(clickData),
      correctPercentage,
      fullData: dbData,
      incorrectPercentage,
    }
    res.status(200).json(responseBody);
  } catch (error) {
    res.status(400).json({
      error: error,
      message: "Error while trying to fetch data",
    });
    return
  }
});

export default router;