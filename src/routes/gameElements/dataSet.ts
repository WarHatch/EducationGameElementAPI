import { Router } from "express";

const router = Router();

router.get('/dataSet', (req, res) => {
  const html = "<div>" + 
      "<button id=\"slug\" " +
        "onclick=" +
          "\"console.log(\'I have been sent here to recognize CLICKS!\');" +
          "document.getElementById('slug').remove();\" " +
        "class=\"edugame-white s-4\">" +
            "OwO sum text" +
        "</button>" +
    "</div>"
  const onClickFunc = () => {
    console.log("I have been sent here to recognize CLICKS!");
  };
  const gameElementsDataSet: IGameUnitDataSet<IClickableGameElement> = {
    css: null,
    gameElements: [
      {
        slug: 'exampleText',
        html: html,
        onClick: onClickFunc.toString(),
      },
    ]
  }

  res.json(gameElementsDataSet);
});

export default router;