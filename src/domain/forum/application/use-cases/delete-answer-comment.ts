import { Either, left, right } from '@/core/either';
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { AnswerCommentRepository } from '../repositories/answer-comments-repository';
;

interface DeleteAnswerCommentUseCaseRequest {
  authorId:string
  answerCommentId:string
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError,unknown> 


export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentRepository:AnswerCommentRepository
  ) {}

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest):Promise<DeleteAnswerCommentUseCaseResponse> {
    const answerComment =  await this.answerCommentRepository.findById(answerCommentId)
    
    if(!answerComment){
      return left(new ResourceNotFoundError())
    }

    if(answerComment.authorId.toString() !== authorId){
      return left(new NotAllowedError())
    }

    await this.answerCommentRepository.delete(answerComment)

    return right({})
  }
}