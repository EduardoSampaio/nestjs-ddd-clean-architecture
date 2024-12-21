import { Optional } from "@/core/types/optional"
import { UniqueEntityId } from "./value-objects/unique-entity-id"
import { Comment, CommentProps } from "./comment"


export interface AnswerCommentProps extends CommentProps {
    answerId: UniqueEntityId
}

export class AnswerComment extends Comment<AnswerCommentProps> {

    get answerId() {
        return this.props.answerId;
    }

    set authorId(authorId: UniqueEntityId) {
        this.props.answerId = authorId
    }

    static create(props: Optional<AnswerCommentProps, 'createdAt'>, id?: UniqueEntityId) {
        const answerComment = new AnswerComment({
            ...props,
            createdAt: props.createdAt ?? new Date(),

        }, id);
        return answerComment;
    }
}
