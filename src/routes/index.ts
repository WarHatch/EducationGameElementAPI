import { Router } from "express";

import rootRoutes from "./root"

const mainRouter = new Router();

mainRouter.use(rootRoutes);

export default mainRouter;
