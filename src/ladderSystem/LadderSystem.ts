import Match from "./Match";
import Player from "./Player";

export default class LadderSystem {

	private _matches = new Set<Match>();
	private players = new Set<Player>();

	constructor() {
	}

	public get matches() {
		return this._matches
	}

	public addPlayer(player: Player) {
		this.players.add(player);
	}

	public updateMatches() {
		this._matches = new Set<Match>();

		let lastPlayer: Player | undefined = undefined;

		for (const player of this.playersSortedByScore()) {
			if (lastPlayer) {
				this.matches.add(new Match(lastPlayer, player));
				lastPlayer = undefined;
			} else {
				lastPlayer = player;
			}
		}

		// if there's a single unmached player
		if (lastPlayer)
			lastPlayer.win();
	}

	public playersSortedByScore() {
		return Array.from(this.players)
			.sort((p1: Player, p2: Player) => {
				if (p1.score === p2.score)
					return 0;
				else if (p1.score > p2.score)
					return 1
				else
					return -1;
			});
	}
}
