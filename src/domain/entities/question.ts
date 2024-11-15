import { Slug } from "./value-objects/slug"
import { Entity } from "../../core/entities/entity"
import { UniqueEntityId } from "./value-objects/unique-entity-id"
import { Optional } from "../../core/types/optional"
import dayjs from "dayjs"

interface QuestionProps {
    title: string
    content: string
    slug: Slug
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId
    createdAt: Date,
    updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
    static create(props: Optional<QuestionProps, 'createdAt'>) {
        const question = new Question({
            ...props,
            slug: Slug.createFromText(props.title),
            createdAt: new Date(),
        });

        return question;
    }

    get title() {
        return this.props.title;
    }

    get content() {
        return this.props.content;
    }

    get slug() {
        return this.props.slug;
    }

    get authorId() {
        return this.props.authorId;
    }

    get bestAnswerId() {
        return this.props.bestAnswerId;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get Slug() {
        return this.props.slug;
    }

    get isNew() {
        return dayjs().diff(this.createdAt) <= 3
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    set title(title: string) {
        this.props.title = title;
        this.props.slug = Slug.createFromText(title);
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }
}