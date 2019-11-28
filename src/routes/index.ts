import { Router } from "express";

import rootRoutes from "./root"
import gameElementsRoutes from "./gameElements"

const mainRouter = Router();

mainRouter.use(rootRoutes);
mainRouter.use("/gameElements", gameElementsRoutes);

export default mainRouter;
