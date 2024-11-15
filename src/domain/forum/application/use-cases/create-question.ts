import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';


interface CreateQuestionUseCaseRequest {
    authorId: string
    title: string
    content: string
}

interface CreateQuestionUseCaseResponse {
    question: Question
}

export class CreateQuestionUseCase {
    constructor(private questionsRepository: QuestionRepository) { }
    async execute({ title, authorId, content }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            content,
            title
        });

        await this.questionsRepository.create(question);

        return {
            question
        };
    }
}