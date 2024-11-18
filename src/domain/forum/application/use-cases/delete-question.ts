import { QuestionRepository } from '../repositories/question-repository';


interface DeleteQuestionUseCaseRequest {
    authorId: string
    questionId: string
}

export class DeleteQuestionUseCase {
    constructor(private questionsRepository: QuestionRepository) { }
    async execute({ authorId, questionId }: DeleteQuestionUseCaseRequest): Promise<void> {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            throw new Error('Question not found');
        }

        if (question.authorId.toValue !== authorId) {
            throw new Error('Not allowed');
        }

        await this.questionsRepository.delete(question)
    }
}