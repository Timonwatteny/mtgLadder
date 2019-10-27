import Identifiable from "./Identifiable";

export default class CrudDb<T> {

	private index = 0;
	private ts = new Map<number, Identifiable<T>>();

	public all(): Identifiable<T>[] {
		return [...this.ts.values()];
	}

	public get(id: number): Identifiable<T> | undefined {
		return this.ts.get(id);
	}

	public add(t: T): any {
		this.ts.set(this.index, new Identifiable(this.index, t));
		this.index++;
	}

	public update(id: number, t: T): boolean {
		const old = this.get(id);

		if (!old)
			return false;

		this.ts.set(id, new Identifiable<T>(old.id, t));

		return true;
	}

	public delete(id: number): boolean {
		const old = this.get(id);

		if (!old)
			return false;

		this.ts.delete(id);

		return true;
	}
}
