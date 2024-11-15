import { UniqueEntityId } from "@/domain/forum/enterprise/entities/value-objects/unique-entity-id"

export class Entity<Props> {
    private _id: UniqueEntityId
    protected props: Props

    get id(): string {
        return this._id.toValue
    }

    protected constructor(props: Props, id?: UniqueEntityId) {
        this._id = id ?? new UniqueEntityId(id)
        this.props = props
    }

}