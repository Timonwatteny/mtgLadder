import Player from "./Player";

export default class MatchEndState {
	constructor(
		private _winner: Player | undefined
	) {
	}

	public isDraw(): boolean {
		return this._winner === undefined;
	}

	public get winner(): Player {
		return <Player>this._winner;
	}
}