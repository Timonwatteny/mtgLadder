export default class PointConfig {
	constructor(
		private _win: number,
		private _lose: number,
		private _draw: number
	) {
	}

	public get win(): number {
		return this._win;
	}

	public get lose(): number {
		return this._lose;
	}

	public get draw(): number {
		return this._draw;
	}

}