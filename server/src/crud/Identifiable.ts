export default class Identifiable<T> {
	constructor(
		private _id: number,
		private _t: T
	) { }

	get value() {
		return this._t;
	}

	get id() {
		return this._id;
	}
}
