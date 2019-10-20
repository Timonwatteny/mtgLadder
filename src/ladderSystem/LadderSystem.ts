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

	public generateFirstMatches() {
		// TODO:
		const i = this.players.size;

		for (const player of this.sortOnScore()) {
            
		}

		// pseudo code ;p
		// if(/* eentje over */) {
		// 	over.win();
		// }

		//const m1 = new Match(, );
	}

	public sortOnScore() {
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
