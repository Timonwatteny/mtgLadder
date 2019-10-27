import CrudDb from "./CrudDb";
import { Router } from "express";

export default class CrudRouter<T> {
	constructor(
		private _db = new CrudDb<T>(),
		private _router = Router()
	) {
		this.router.get("/", (req, res) => {
			res.json(this.db.all());
		});

		this.router.get("/:id/", (req, res) => {
			const id = parseInt(req.params.id)
			const t = this.db.get(id);

			if (t)
				res.json(t);
			else
				res.status(404).send("Invallid Id");
		});

		this.router.post("/", (req, res) => {
			const t = req.body;

			if (t)
				res.send(this.db.add(t));
			else
				res.status(404).send("No body!");
		});

		this.router.put("/:id/", (req, res) => {
			const id = parseInt(req.params.id);
			const t = req.body;
			if (!this.db.update(id, t))
				res.status(404);

			res.send("");
		});

		this.router.delete("/:id/", (req, res) => {
			const id = parseInt(req.params.id);
			if (!this.db.delete(id))
				res.status(404);

			res.send("");
		});
	}

	get router() {
		return this._router;
	}

	get db() {
		return this._db;
	}
}
