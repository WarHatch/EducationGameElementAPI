import { Router } from "express";

import rootRoutes from "./register"

const gameSessionRouter = Router();

gameSessionRouter.use(rootRoutes);

export default gameSessionRouter;
