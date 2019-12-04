import { Router } from "express";

import CMSController from "../../CMScontroller/gameElementController";

const router = Router();

type IButtonData = {
  _key: string,
  _type: "button",
  title: string,
  backgroundColor: string,
  dissapears: boolean,
  trackable: boolean,
}
router.get('/dataSet', async (req, res) => {
  const data = await CMSController.fetchALLCMSData();

  const buttonData: IButtonData = data[0].correctAnswers[0];
  console.log(data);
  
  const html = "<div>" + 
      `<button id="${buttonData._key}" ` +
        "onclick=\""+
          `${buttonData.trackable ? "console.log(\'I should send back a report after being clicked\');" : ""}` +
          `${buttonData.dissapears ? "document.getElementById('slug').remove();" : ""}` +
        "\"" +
        "class=\""+
          `edugame-${buttonData.backgroundColor} s-4` +
        "\"" +
      ">" +
        buttonData.title +
      "</button>" +
    "</div>"

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
});

router.get('/cms', async (req, res) => {
  const data = await CMSController.fetchALLCMSData();

  res.json(data);
});

export default router;