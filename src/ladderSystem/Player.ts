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

	public win() {
		this._score += 3;
	}

	public draw() {
		this._score += 1;
	}

	public lose() {
		this._score += 0;
	}
}
