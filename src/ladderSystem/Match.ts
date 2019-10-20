import Player from "./Player";
import MatchEndState from "./MatchEndState";

export default class Match {
	constructor(
		private player1: Player,
		private player2: Player,
	) {
		player1.isPlaying = true;
		player2.isPlaying = true;
	}

	public finish(matchEndState: MatchEndState) {
		this.player1.isPlaying = false;
		this.player2.isPlaying = false;

		if (matchEndState.isDraw()) {
			this.player1.draw();
			this.player2.draw();
		} else if (this.player1 == matchEndState.winner) {
			this.player1.win();
			this.player2.lose();
		} else {
			this.player1.lose();
			this.player2.win();
		}
	}
}
