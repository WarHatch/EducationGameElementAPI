import { Router } from "express";

import dataSetRoutes from "./dataSet"

const gameElementsRouter = Router();

gameElementsRouter.use(dataSetRoutes);

export default gameElementsRouter;
