import { Router } from "express";

import dataSetRoutes from "./dataSet"
import cmsRoutes from "./cms"

const gameElementsRouter = Router();

gameElementsRouter.use(dataSetRoutes);
gameElementsRouter.use(cmsRoutes);

export default gameElementsRouter;
