import { Router } from "express";
import SeqDataModels from "../../database/sequelize"; 

// Types
import { IClickDataModel } from "../../database/models/ClickData.d";
import { ISession } from "../../database/models/Session.d";

const router = Router();

router.post("/register/start", async (req, res) => {
  const startData: ISession = req.body;
  console.log("Received startData:");
  console.log(startData);

  try {
    // await SeqDataModels.qqq.create(startData); TODO
    res.status(201).send();
  } catch (error) {
    res.status(400).send("Error while trying to create an entry in database");
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