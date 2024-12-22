import { Either, left, right } from '@/core/either';

import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { QuestionCommentRepository } from '../repositories/question-comments-repository';

interface DeleteQuestionCommentUseCaseRequest {
  authorId:string
  questionCommentId:string
}

type DeleteQuestionCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError , {}>


export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentRepository:QuestionCommentRepository
  ) {}

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionCommentUseCaseRequest):Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment =  await this.questionCommentRepository.findById(questionCommentId)
    
    if(!questionComment){
      return left(new ResourceNotFoundError())
    }

    if(questionComment.authorId.toString() !== authorId){
      return left(new NotAllowedError())
    }

    await this.questionCommentRepository.delete(questionComment)

    return right({})
  }
}
