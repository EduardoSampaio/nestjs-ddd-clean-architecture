import { Entity } from "@/core/entities/entity"
import { Optional } from "@/core/types/optional"
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

    private touch() {
        this.props.updatedAt = new Date();
    }

    getExcerpt(content: string) {
        return content.substring(0, 120).concat('...')
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    set title(title: string) {
        this.title = title;
        this.touch();
    }

    static create(props: Optional<AnswerProps, 'createdAt'>) {
        const answer = new Answer({
            ...props,
            createdAt: new Date(),
        });
        return answer;
    }
}
