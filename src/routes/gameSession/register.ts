import { Router } from "express";

const router = Router();

export type IButtonData = {
  _key: string,
  _type: "button",
  title: string,
  backgroundColor: string,
  disappears: boolean,
  trackable: boolean,
}
router.post("/register/buttonClick", async (req, res) => {
  console.log("Received body:\n" + JSON.stringify(req.body));
  const buttonData: IButtonData = req.body.data;

  // code that saves data in DB...

  res.status(201).send();
});

export default router;