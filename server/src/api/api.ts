import { Router } from "express";
import CrudRouter from "../crud/CrudRouter";

const apiRouter = Router();

apiRouter.use("/test/", new CrudRouter<{bla: string}>().router);

export default apiRouter;
