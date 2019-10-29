import Identifiable from "./Identifiable";

export default class Serializer<T> {
	constructor(
		private serializer = (t: Identifiable<T>) => <any>t,
		private deSerializer: (a: any) => T | undefined = (a: any) => <T>a
	) {
	}

	public serialize(t: Identifiable<T>) {
		return this.serializer(t);
	}

	public deSerialize(a: any) {
		return this.deSerializer(a);
	}
}