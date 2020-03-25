import { Router } from "express";

import CMSController from "../../cmsDataHandler/gameElementController";

const router = Router();

router.get("/cms", async (req, res) => {
  const data = await CMSController.fetchALLCMSData();

  res.json(data);
});


router.get("/cms/sentenceConstructor/:contentSlug", async (req, res) => {
  const { contentSlug } = req.params;

  const data = await CMSController.fetchCMSDataByContentSlug(contentSlug);

  res.json(data);
});

export default router;