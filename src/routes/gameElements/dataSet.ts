import { Router } from "express";

import endSessionButton from "../../ReactGenerators/elements/endSessionButton";
import questionElement from "../../ReactGenerators/elements/question";
import { questionWidth } from "../../ReactGenerators/configs/commonElementConfigs";

const router = Router({mergeParams: true});

router.get("/dataSet/:conteinerHeight", async (req, res) => {
  const { conteinerHeight: conteinerHeightParam } = req.params;
  const conteinerHeight = parseInt(conteinerHeightParam)

  const questionHTMLPromise = questionElement({ conteinerHeight, width: questionWidth });

  const endSessionHTML = {
    html: endSessionButton({})
  }

  const gameElementsDataSet = {
    gameElements: {
      endSessionHTML,
      questionHTML: await questionHTMLPromise,
    }
  }

  res.json(gameElementsDataSet);

  console.log("Game elements sent:");
  console.log(gameElementsDataSet);
});

export default router;