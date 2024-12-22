
import { Either, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/questions-repository';

interface FetchRecenteQuestionsUseCaseRequest {
  page:number
}

type FetchRecenteQuestionsUseCaseResponse = Either<null, {
  questions:Question[]
}>


export class FetchRecenteQuestionsUseCase {
  constructor(private questionRepository: QuestionsRepository) {}

  async execute({
   page
  }: FetchRecenteQuestionsUseCaseRequest):Promise<FetchRecenteQuestionsUseCaseResponse> {
    const questions = await this.questionRepository.findManyRecent({page})

    return right({questions})
  }
}
