import { Entity } from "../../core/entities/entity"
import { Optional } from "../../core/types/optional"
import { UniqueEntityId } from "./value-objects/unique-entity-id"


interface AnswerProps {
    content: string
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    createdAt: Date,
    updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
    get content() {
        return this.props.content
    }

    get authorId() {
        return this.props.authorId
    }

    get questionId() {
        return this.props.questionId
    }

    get createdAt() {
        return this.props.createdAt
    }

    get updatedAt() {
        return this.props.updatedAt
    }

    static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId) {
        const answer = new Answer({
            ...props,
            createdAt: new Date(),
        });
        return answer;
    }
}
