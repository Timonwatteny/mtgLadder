import CrudDb from "../crud/CrudDb";
import Player from "./Player";
import Serializer from "../crud/Serializer";

export default class Namespace {
	private _players = new CrudDb<Player>();
	private _tournaments = new CrudDb<Player>();

	constructor(
		private _name: string
	) {
	}

	get name() {
		return this._name;
	}

	get players() {
		return this._players;
	}

	get tournaments() {
		return this._tournaments;
	}

	static getSerializer(): Serializer<Namespace> {
		return new Serializer<Namespace>(
			t => {
				return {
					id: t.id,
					name: t.value._name
				}
			},
			a => {
				if (a.name)
					return new Namespace(a.name)
			}
		);
	}
}
