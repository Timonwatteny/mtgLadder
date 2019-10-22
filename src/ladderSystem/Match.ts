import Player from "./Player";
import MatchEndState from "./MatchEndState";

export default class Match {
	constructor(
		private _player1: Player,
		private _player2: Player,
	) {
		_player1.isPlaying = true;
		_player2.isPlaying = true;
	}

	get player1() {
		return this._player1;
	}

	get player2() {
		return this._player2;
	}

	public finish(matchEndState: MatchEndState) {

		if (
			this._player1.isPlaying &&
			this._player2.isPlaying
		) {
			this._player1.isPlaying = false;
			this._player2.isPlaying = false;

			if (matchEndState.isDraw()) {
				this._player1.draw();
				this._player2.draw();
			} else if (this._player1 == matchEndState.winner) {
				this._player1.win();
				this._player2.lose();
			} else {
				this._player1.lose();
				this._player2.win();
			}
		}
	}
}
