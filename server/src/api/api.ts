import { Router } from "express";
import CrudRouter, { SubRoutes, SubRoute } from "../crud/CrudRouter";
import Namespace from "../model/Namespace";
import CrudDb from "../crud/CrudDb";

const apiRouter = Router();

const subRoutes: SubRoutes<Namespace> = new Map<string, SubRoute<Namespace>>();

subRoutes.set("players", {
	subRouteDbGetter: namespace => namespace.players
});

const namespaceRouter = CrudRouter.makeFromConfig({
	name: "namespace",
	subRoutes,
	serializer: Namespace.getSerializer()
}).router;

apiRouter.use("/namespaces/", namespaceRouter);

export default apiRouter;
