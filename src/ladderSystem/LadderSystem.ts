import Match from "./Match";
import Player from "./Player";

export default class LadderSystem {

	private _matches: Set<Match> = new Set<Match>();
	private players: Set<Player> = new Set<Player>();

	constructor() {
	}

	public get matches() {
		return this._matches
	}

	public addPlayer(player: Player) {
		this.players.add(player);
	}

	public updateMatches() {
		// TODO:
	}
}
