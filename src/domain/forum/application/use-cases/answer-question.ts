import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';


interface AnswerQuestionUseCaseRequest {
    questionId: string
    instructorId: string
    content: string
}

export class AnswerQuestionUseCase {
    constructor(private answersRepository: AnswersRepository) { }
    async execute({ questionId, instructorId, content }: AnswerQuestionUseCaseRequest) {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId)
        });

        await this.answersRepository.create(answer);

        return answer;
    }
}