import { Router } from "express";

import registerRoutes from "./register"
import dataRoutes from "./data";
import configRoutes from "./config";

const sessionRouter = Router({mergeParams: true});

sessionRouter.use(registerRoutes);
sessionRouter.use(dataRoutes);
sessionRouter.use(configRoutes);

export default sessionRouter;
