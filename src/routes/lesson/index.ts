import { Router } from "express";

// Routers
import sessionRouter from "./session";
import rootRouter from "./root";

const lessonRouter = Router();

lessonRouter.use(rootRouter);
lessonRouter.use("/:lessonId/session", sessionRouter);

export default lessonRouter;
