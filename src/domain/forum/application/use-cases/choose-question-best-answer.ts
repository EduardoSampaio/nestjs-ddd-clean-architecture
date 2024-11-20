import { Question } from '@/domain/forum/enterprise/entities/question';
import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { QuestionRepository } from '../repositories/question-repository';


interface ChooseBestQuestionUseCaseRequest {
    authorId: string;
    answerId: string
}

interface ChooseBestQuestionUseCaseResponse {
    question: Question
}

export class ChooseBestQuestionUseCase {
    constructor(private answersRepository: AnswersRepository,
        private questionsRepository: QuestionRepository
    ) { }
    async execute({ answerId, authorId }: ChooseBestQuestionUseCaseRequest): Promise<ChooseBestQuestionUseCaseResponse> {
        const answer = await this.answersRepository.findById(answerId);

        if (!answer) {
            throw new Error('Answer not found');
        }

        const question = await this.questionsRepository.findById(answer.questionId.toValue);

        if (!question) {
            throw new Error('Question not found');
        }

        if (question.authorId.toValue !== authorId) {
            throw new Error('Not allowed');
        }

        question.bestAnswerId = new UniqueEntityId(answerId);

        await this.questionsRepository.save(question);

        return {
            question
        }

    }
}