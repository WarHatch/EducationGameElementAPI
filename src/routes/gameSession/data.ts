import { Router } from "express";
import SeqDataModels from "../../database/sequelize"; 
import { countAverageReactionTime, countPercentCorrect } from "../../dataParsing";

// Types
import { IClickDataModel } from "../../database/models/ClickData.d"; 

export type ISessionDataRequestModel = {
  sessionId: string,
}

const router = Router();

router.get("/data", async (req, res) => {
  const { body } = req;
  console.log("Received data:");
  console.log(body);

  const { sessionId }:ISessionDataRequestModel = body;;
  try {
    const dbData = await SeqDataModels.ClickData.findAll({
      where: {
        sessionId
      }
    });

    const { correctPercentage, incorrectPercentage } = countPercentCorrect(dbData);
    const responseBody = {
      fullData: dbData,
      averageReactionTime: countAverageReactionTime(dbData),
      correctPercentage,
      incorrectPercentage,
    }
    res.status(201).json(responseBody);
  } catch (error) {
    res.status(400).json({
      message: "Error while trying to fetch data",
      error: error,
    });
    return
  }
});

export default router;