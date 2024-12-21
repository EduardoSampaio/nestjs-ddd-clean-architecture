import { Entity } from "@/core/entities/entity"
import { Optional } from "@/core/types/optional"
import dayjs from "dayjs"
import { Slug } from "./value-objects/slug"
import { UniqueEntityId } from "./value-objects/unique-entity-id"
import { AggregateRoot } from "@/core/entities/aggregate-root"

interface QuestionProps {
    title: string
    content: string
    slug: Slug
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId
    createdAt: Date,
    updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
    static create(props: Optional<QuestionProps, 'createdAt' | 'slug'>, id?: UniqueEntityId) {
        const question = new Question({
            ...props,
            slug: props.slug ?? Slug.createFromText(props.title),
            createdAt: props.createdAt ?? new Date(),
        }, id);

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

    set bestAnswerId(value: UniqueEntityId | undefined) {
        this.props.bestAnswerId = value;
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