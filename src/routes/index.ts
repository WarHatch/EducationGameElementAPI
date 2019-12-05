import { Router } from "express";

import rootRoutes from "./root"
import gameElementsRoutes from "./gameElements"
import gameSessionRoutes from "./gameSession"

const mainRouter = Router();

mainRouter.use(rootRoutes);
mainRouter.use("/gameElements", gameElementsRoutes);
mainRouter.use("/gameSession", gameSessionRoutes);

export default mainRouter;
