import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';


interface EditQuestionUseCaseRequest {
    authorId: string
    questionId: string
    title: string
    content: string
}

interface EditQuestionUseCaseResponse {
    question: Question
}

export class EditQuestionUseCase {
    constructor(private questionsRepository: QuestionRepository) { }
    async execute({ authorId, title, content, questionId }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            throw new Error('Question not found');
        }

        if (question.authorId.toValue !== authorId) {
            throw new Error('Not allowed');
        }

        question.title = title;
        question.content = content

        await this.questionsRepository.save(question)

        return {
            question
        }
    }
}