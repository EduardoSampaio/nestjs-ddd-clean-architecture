
import { Answer } from '../../enterprise/entities/answer';
import { AnswersRepository } from '../repositories/answers-repository';

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
  attachmentsIds: string[]
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository
  ) { }

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)


  }
}
