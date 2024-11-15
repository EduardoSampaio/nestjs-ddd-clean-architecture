export class UniqueEntityId {
    private readonly _id: string;

    constructor(id?: string) {
        this._id = id ?? crypto.randomUUID();
    }

    get toValue(): string {
        return this._id;
    }
}