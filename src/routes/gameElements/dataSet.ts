import { Router } from "express";

const router = Router();

router.get('/dataSet', (req, res) => {
  const html = "<div><span>OwO sum text</span></div>"
  const gameElementsDataSet: IGameUnitDataSet = {
    css: null,
    gameElements: [
      {
        slug: 'exampleText',
        html: html,
      },
    ]
  }

  res.json(gameElementsDataSet);
});

export default router;