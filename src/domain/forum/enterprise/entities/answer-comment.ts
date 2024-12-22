import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { Comment, CommentProps } from './comment'

export interface AnswerCommentProps extends CommentProps{
 answerId:string
}

export class AnswerComment extends Comment<AnswerCommentProps> {

  get answerId(){
    return this.props.answerId
  }

  static create(
    props: Optional<AnswerCommentProps, 'created_at'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
