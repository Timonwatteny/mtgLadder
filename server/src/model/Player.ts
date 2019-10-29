import PointConfig from "./ladderSystem/PointsConfig";

export default class Player {

	public _isPlaying = false;
	private _score = 0;

	constructor(
		private _name: string
	) {
	}

	public get name() {
		return this._name;
	}

	public get isPlaying() {
		return this._isPlaying;
	}

	public set isPlaying(value: boolean) {
		this._isPlaying = value;
	}

	public get score() {
		return this._score;
	}

	public win(pointConfig: PointConfig) {
		this._score += pointConfig.win;
	}

	public draw(pointConfig: PointConfig) {
		this._score += pointConfig.draw;
	}

	public lose(pointConfig: PointConfig) {
		this._score += pointConfig.lose;
	}
}
