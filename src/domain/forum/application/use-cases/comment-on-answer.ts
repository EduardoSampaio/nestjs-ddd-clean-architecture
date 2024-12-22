import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';
import { AnswersRepository } from '../repositories/answers-repository';

interface CommentOnAnswerUseCaseRequest {
  authorId:string
  answerId:string
  content:string
}

type CommentOnAnswerUseCaseResponse = Either<ResourceNotFoundError,{
  answerComment:AnswerComment
}>


export class CommentOnAnswerUseCase {
  constructor(private answerRepository: AnswersRepository,
    private answerCommentRepository:AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest):Promise<CommentOnAnswerUseCaseResponse> {
    const answer =  await this.answerRepository.findById(answerId)
    
    if(!answer){
     return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId).toString(),
      content
    })

    await this.answerCommentRepository.create(answerComment)

    return right({
      answerComment
    })
  }
}
