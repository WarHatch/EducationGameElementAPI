import { Router } from "express";
import SeqDataModels from "../../database/sequelize";

// Types
import { ISession } from "../../database/models/Session.d";

export type IinfluencePackage = {
  speedAdjust: number;
}

const router = Router();

router.post("/influence/:sessionId", async (req, res) => {
  const { body, params } = req;
  const { sessionId } = params;
  console.log("Received data/params:");
  console.log(body);
  console.log(params);

  try {
    const dbData: ISession = await SeqDataModels.Session.findAll({
      where: {
        sessionId
      }
    });

    const responseBody = {
      fullData: dbData,
      callbackAddress: dbData.callbackAddress
    }

    //TODO proxy send the influence body using the callback address
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