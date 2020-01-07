import { Router } from "express";

import rootRoutes from "./root"
import gameElementsRoutes from "./gameElements"
import lessonRoutes from "./lesson";

const mainRouter = Router();

mainRouter.use(rootRoutes);
mainRouter.use("/gameElements", gameElementsRoutes);
mainRouter.use("/lesson", lessonRoutes);

export default mainRouter;
