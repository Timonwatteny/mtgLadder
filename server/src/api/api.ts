import { Router } from "express";
import CrudRouter, { SubRoutes, SubRoute } from "../crud/CrudRouter";
import Namespace from "../model/Namespace";

const apiRouter = Router();

const subRoutes: SubRoutes<Namespace> = new Map<string, SubRoute<Namespace>>();

subRoutes.set("player", {
	subRouteDbGetter: namespace => namespace.players
});

const namespaceRouter = CrudRouter.makeFromConfig({
	name: "namespace",
	subRoutes,
	serializer: Namespace.getSerializer()
});

if (process.env.DEBUG === "true") {
	const namespaceDb = namespaceRouter.getDb(null)

	if (namespaceDb) {
		console.log("adding test namespace");
		namespaceDb.add(new Namespace("yeet"));
	}
}


apiRouter.use("/namespaces/", namespaceRouter.router);

export default apiRouter;
