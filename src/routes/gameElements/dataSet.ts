import { Router } from "express";

const router = Router();

router.get('/dataSet', (req, res) => {
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

export default router;