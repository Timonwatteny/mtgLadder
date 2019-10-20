import Match from "./Match";
import Player from "./Player";

export default class LadderSystem {

	private _matches = new Set<Match>();
	private matchesPerPlayer = new Map<string, Match>();
	private playersByName = new Map<string, Player>();
	private players = new Set<Player>();

	constructor() {
	}

	public get matches() {
		return this._matches;
	}

	public getMatch(playerName: string) {
		return this.matchesPerPlayer.get(playerName);
	}

	private addMatch(match: Match) {
		this.matchesPerPlayer.set(match.player1.name, match);
		this.matchesPerPlayer.set(match.player2.name, match);

		this.matches.add(match);
	}

	public addPlayer(player: Player) {
		this.players.add(player);
		this.playersByName.set(player.name, player);
	}

	public getPlayer(name: string) {
		return this.playersByName.get(name);
	}

	private resetMatches() {
		this._matches = new Set<Match>();
		this.matchesPerPlayer = new Map<string, Match>();
	}

	public updateMatches() {
		this.resetMatches();

		let lastPlayer: Player | undefined = undefined;

		for (const player of this.playersSortedByScore()) {
			if (lastPlayer) {
				this.addMatch(new Match(lastPlayer, player));
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
					return 1;
				else
					return -1;
			});
	}
}
