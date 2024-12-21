import { Entity } from "@/core/entities/entity"
import { Optional } from "@/core/types/optional"
import dayjs from "dayjs"
import { UniqueEntityId } from "./value-objects/unique-entity-id"

export interface CommentProps {
    authorId: UniqueEntityId
    content: string,
    createdAt: Date,
    updatedAt?: Date
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props> {

    get content() {
        return this.props.content;
    }

    get authorId() {
        return this.props.authorId;
    }

    get createdAt() {
        return this.props.createdAt;
    }

    get updatedAt() {
        return this.props.updatedAt;
    }

    get isNew() {
        return dayjs().diff(this.createdAt) <= 3
    }

    set content(content: string) {
        this.props.content = content;
        this.touch();
    }

    private touch() {
        this.props.updatedAt = new Date();
    }
}