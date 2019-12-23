import { Router } from "express";
import SeqDataModels from "../../database/sequelize"; 

// Types
import { IClickDataModel } from "../../database/models/ClickData.d";
import { ISession } from "../../database/models/Session.d";

const router = Router();

router.post("/register", async (req, res) => {
  const startData: ISession = req.body;
  console.log("Received start session data:");
  console.log(startData);

  try {
    await SeqDataModels.Session.upsert(startData);
    res.status(201).send();
  } catch (error) {
    res.status(400).send("Error while trying to create/update an entry in database");
    console.log(error);
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