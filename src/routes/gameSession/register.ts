import { Router } from "express";
import SeqDataModels from "../../database/sequelize"; 

// Types
import { IClickDataModel } from "../../database/models/ClickData.d"; 

const router = Router();

router.post("/register/buttonClick", async (req, res) => {
  const clickData: IClickDataModel = req.body;
  console.log("Received data:");
  console.log(clickData);

  try {
    SeqDataModels.ClickData.create(clickData);
    res.status(201).send();
  } catch (error) {
    res.status(400).send("Error while trying to create an entry in database");
  }
});

export default router;