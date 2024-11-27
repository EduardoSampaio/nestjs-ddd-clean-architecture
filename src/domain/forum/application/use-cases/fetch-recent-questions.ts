import { Question } from '@/domain/forum/enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';

interface FetchRecentQuestionUseCaseRquest {
    page: number
}

interface FetchRecentQuestionUseCaseResponse {
    questions: Question[]
}

export class FetchRecentQuestionUseCase {
    constructor(private questionsRepository: QuestionRepository) { }
    async execute({ page }: FetchRecentQuestionUseCaseRquest): Promise<FetchRecentQuestionUseCaseResponse> {
        const questions = await this.questionsRepository.findManyRecent({ page });
        return {
            questions
        }
    }
}