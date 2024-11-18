import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';

interface GetQuestionBySlugUseCaseRquest {
    slug: string
}

interface GetQuestionBySlugUseCaseResponse {
    question: Question
}

export class GetQuestionBySlugUseCase {
    constructor(private questionsRepository: QuestionRepository) { }
    async execute({ slug }: GetQuestionBySlugUseCaseRquest): Promise<GetQuestionBySlugUseCaseResponse> {
        const question = await this.questionsRepository.findBySlug(slug);

        if (!question) {
            throw new Error('Question not found');
        }

        return {
            question
        };
    }
}