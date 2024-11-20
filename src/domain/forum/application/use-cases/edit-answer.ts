import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { AnswersRepository } from "../repositories/answers-repository";


interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) { }
  async execute({ authorId, content, answerId }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId);

    if (!answer) {
      throw new Error('Answer not found');
    }

    if (answer.authorId.toValue !== authorId) {
      throw new Error('Not allowed');
    }

    answer.content = content

    await this.answersRepository.save(answer)

    return {
      answer
    }
  }
}