import { Router } from "express";

import registerRoutes from "./register"
import dataRoutes from "./data";
import configRoutes from "./config";
import influenceRoutes from "./influence";

const gameSessionRouter = Router();

gameSessionRouter.use(registerRoutes);
gameSessionRouter.use(dataRoutes);
gameSessionRouter.use(configRoutes);
gameSessionRouter.use(influenceRoutes);

export default gameSessionRouter;
