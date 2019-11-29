import { Router } from "express";

const router = Router();

router.get('/dataSet', (req, res) => {
  const html = "<div><span classname='edugame-white s-4'>OwO sum text</span></div>"
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