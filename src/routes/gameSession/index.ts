import { Router } from "express";

import registerRoutes from "./register"
import dataRoutes from "./data";

const gameSessionRouter = Router();

gameSessionRouter.use(registerRoutes);
gameSessionRouter.use(dataRoutes);

export default gameSessionRouter;
