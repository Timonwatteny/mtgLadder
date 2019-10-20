import Match from "./Match";
import Player from "./Player";

class LadderSystem {

	private matches: Set<Match> = new Set<Match>();
	private players: Set<Player> = new Set<Player>();

	constructor() {
	}

	public addUser(player: Player) {
		this.players.add(player);
	}

	public updateMatches() {
		// TODO:
	}
}
