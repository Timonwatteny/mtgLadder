import CrudDb from "./CrudDb";
import { Router } from "express";
import Serializer from "./Serializer";
import { serialize } from "v8";

export type SubRoutes<T> = Map<string, SubRoute<T>>
export type SubRoute<T> = {
	subRoutes?: SubRoutes<any>,
	subRouteDbGetter: (t: T) => CrudDb<any>
}

export default class CrudRouter<T> {

	static makeFromConfig<T>(config: {
		name: string,
		subRoutes?: SubRoutes<T>,
		dbGetter?: (req: any) => CrudDb<T> | undefined,
		serializer?: Serializer<T>,
		router?: Router
	}) {
		const fallback = {
			subRoutes: new Map<string, SubRoute<T>>(),
			dbGetter: (function () {
				const db = new CrudDb<T>();
				return (req: any) => db;
			})(),
			serializer: new Serializer<T>(),
			router: Router()
		}

		return this.make(Object.assign(config, fallback));
	}

	private static make<T>({
		name,
		subRoutes,
		dbGetter,
		serializer,
		router
	}: {
		name: string,
		subRoutes: SubRoutes<T>,
		dbGetter: (req: any) => CrudDb<T> | undefined,
		serializer: Serializer<T>,
		router: Router
	}) {
		return new CrudRouter<T>(name, subRoutes, dbGetter, serializer, router);
	}

	constructor(
		private name: string,
		private _subRoutes: SubRoutes<T>,
		private _dbGetter: (req: any) => CrudDb<T> | undefined,
		private _serializer: Serializer<T>,
		private _router: Router
	) {
		this.registerCrudRoutes();
		// this.registerSubRoutes();
	}

	registerCrudRoutes() {
		this.router.get(`/`, (req, res) => {
			const db = this.dbGetter(req);

			if (db)
				res.json(db
					.all()
					.map(t => this.serializer.serialize(t)));
			else
				res.status(404).send("");
		});

		this.router.get(`/:${this.name}/`, (req, res) => {
			const t = this.getT(req);

			if (t)
				res.json(this.serializer.serialize(t));
			else
				res.status(404).send(`Invallid Id`);
		});

		this.router.post(`/`, (req, res) => {
			const db = this.dbGetter(req);
			const body = req.body;

			if (body && db) {
				const t = this.serializer.deSerialize(body)

				if (t) {
					const id = db.add(t);
					res.send(`${id}`);
				} else {
					res.status(500).send(`Invalid body!`);
				}
			} else {
				res.status(500).send(`No body!`);
			}
		});

		this.router.put(`/:${this.name}/`, (req, res) => {
			const db = this.dbGetter(req);
			const id = parseInt(req.params[this.name]);
			const body = req.body;

			if (body && db) {
				const t = this.serializer.deSerialize(body)

				if (t) {
					if (!db.update(id, t))
						res.status(404);
				} else {
					res.status(500).send("Invallid body!")
				}

			} else {
				res.status(500).send(`No body!`);
			}

			res.send(``);
		});

		this.router.delete(`/:${this.name}/`, (req, res) => {
			const db = this.dbGetter(req);
			const id = parseInt(req.params[name]);

			if (db && !db.delete(id))
				res.status(404);

			res.send(``);
		});
	}

	registerSubRoutes() {
		for (const [subRoute, { subRoutes, subRouteDbGetter }] of this.subRoutes.entries()) {
			this.router.use(`/:${this.name}/${subRoute}/`, CrudRouter.makeFromConfig({
				name: subRoute,
				subRoutes,
				dbGetter: req => {
					const t = this.getT(req);
					if (t)
						return subRouteDbGetter(t.value)
				}
			}).router);
		}
	}

	private getT(req: any) {
		const id = parseInt(req.params[this.name]);
		const db = this.dbGetter(req);
		if (db)
			return db.get(id)
	}

	get router() {
		return this._router;
	}

	get dbGetter() {
		return this._dbGetter;
	}

	get subRoutes() {
		return this._subRoutes;
	}

	get serializer() {
		return this._serializer;
	}
}
