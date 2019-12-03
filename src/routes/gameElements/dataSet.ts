import { Router } from "express";

import CMSController from "../../CMScontroller/gameElementController";

const router = Router();

router.get('/dataSet', async (req, res) => {
  const html = "<div>" + 
      "<button id=\"slug\" " +
        "onclick=" +
          "\"console.log(\'I have been sent here to explode on clicks!\');" +
          "document.getElementById('slug').remove();\" " +
        "class=\"edugame-white s-4\">" +
            "OwO sum text" +
        "</button>" +
    "</div>"
  const gameElementsDataSet: IGameUnitDataSet<IGameElement> = {
    css: null,
    gameElements: [
      {
        slug: 'exampleText',
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