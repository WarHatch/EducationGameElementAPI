import { Router } from "express";

const router = new Router();

router.get('/', (req, res) => {
  res.send('You have reached GameElementAPI!');
});

export default router;