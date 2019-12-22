import { Router } from "express";

import registerRoutes from "./register"
import dataRoutes from "./data";
import influenceRoutes from "./influence";

const gameSessionRouter = Router();

gameSessionRouter.use(registerRoutes);
gameSessionRouter.use(dataRoutes);
gameSessionRouter.use(influenceRoutes);

export default gameSessionRouter;
