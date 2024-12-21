import { QuestionComment } from './../../enterprise/entities/question-comment';
import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question-repository';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';


interface CommentOnQuestionUseCaseRequest {
    authorId: string
    questionId: string
    content: string
}

interface CommentOnQuestionUseCaseResponse {
    questionComment: QuestionComment
}

export class CommentOnQuestionUseCase {
    constructor(private questionsRepository: QuestionRepository,
        private questionCommentRepository: QuestionCommentRepository
    ) { }
    async execute({ questionId, authorId, content }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
        const question = await this.questionsRepository.findById(questionId);

        if (!question) {
            throw new Error('Question not found');
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
            content
        })

        await this.questionCommentRepository.create(questionComment);

        return { questionComment }
    }
}