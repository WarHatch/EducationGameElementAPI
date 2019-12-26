import { Router } from "express";

import registerRoutes from "./register"
import dataRoutes from "./data";
import configRoutes from "./config";

const gameSessionRouter = Router();

gameSessionRouter.use(registerRoutes);
gameSessionRouter.use(dataRoutes);
gameSessionRouter.use(configRoutes);

export default gameSessionRouter;
