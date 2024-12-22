
import { Either, right } from '@/core/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';

interface FetchAnswerCommentUseCaseRequest {
  answerId:string
  page:number
}

type FetchAnswerCommentUseCaseResponse = Either<null, {
  answerComments:AnswerComment[]
}>


export class FetchAnswerCommentUseCase {
  constructor(private answerCommentRepository: AnswerCommentRepository) {}

  async execute({
   page,
   answerId
  }: FetchAnswerCommentUseCaseRequest):Promise<FetchAnswerCommentUseCaseResponse> {
    const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId,{page})

    return right({answerComments})
  }
}
