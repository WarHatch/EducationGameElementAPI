import { Router } from "express";

import rootRoutes from "./root"
import gameElementsRoutes from "./gameElements"
import gameSessionRoutes from "./gameSession"
import lessonRoutes from "./lesson";

const mainRouter = Router();

mainRouter.use(rootRoutes);
mainRouter.use("/gameElements", gameElementsRoutes);
mainRouter.use("/gameSession", gameSessionRoutes);
mainRouter.use("/lesson", lessonRoutes);

export default mainRouter;
