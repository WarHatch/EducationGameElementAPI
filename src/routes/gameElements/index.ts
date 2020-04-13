import { Router } from "express";

import dataSetRoutes from "./dataSet"
import cmsRoutes from "./cms"

const gameElementsRouter = Router({mergeParams: true});

gameElementsRouter.use(dataSetRoutes);
gameElementsRouter.use(cmsRoutes);

export default gameElementsRouter;
