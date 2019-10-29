import CrudDb from "../crud/CrudDb";
import Player from "./Player";

export default class Namespace {
	private _players = new CrudDb<Player>();
	private _tournaments = new CrudDb<Player>();

	get players() {
		return this._players;
	}

	get tournaments() {
		return this._tournaments;
	}
}
