import { Router } from "express";

import Button from "../../ReactGenerators/elements/button/button"
import CMSController from "../../cmsDataHandler/gameElementController";

const router = Router();

export type IButtonData = {
  _key: string,
  _type: "button",
  title: string,
  backgroundColor: string,
  disappears: boolean,
  trackable: boolean,
}
router.get("/dataSet", async (req, res) => {
  const data = await CMSController.fetchALLCMSData();

  const buttonData: IButtonData = data[0].correctAnswers[0];
  
  const html = Button(buttonData);

  const gameElementsDataSet: IGameUnitDataSet<IGameElement> = {
    css: null,
    gameElements: [
      {
        slug: data[0]._id,
        html: html
      },
    ]
  }

  res.json(gameElementsDataSet);
  console.log("Game elements sent");
});

router.get("/cms", async (req, res) => {
  const data = await CMSController.fetchALLCMSData();

  res.json(data);
});

export default router;