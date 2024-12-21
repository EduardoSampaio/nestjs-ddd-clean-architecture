import { QuestionComment } from '../../enterprise/entities/question-comment';
import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { QuestionRepository } from '../repositories/question-repository';
import { QuestionCommentRepository } from '../repositories/question-comment-repository';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment-repository';
import { AnswersRepository } from '../repositories/answers-repository';


interface CommentOnAnswerUseCaseRequest {
    authorId: string
    answerId: string
    content: string
}

interface CommentOnAnswerUseCaseResponse {
    answerComment: AnswerComment
}

export class CommentOnAnswerUseCase {
    constructor(private answerRepository: AnswersRepository,
        private answerCommentRepository: AnswerCommentRepository
    ) { }
    async execute({ answerId, authorId, content }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
        const question = await this.answerRepository.findById(answerId);

        if (!question) {
            throw new Error('Question not found');
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityId(authorId),
            answerId: new UniqueEntityId(answerId),
            content
        })

        await this.answerCommentRepository.create(answerComment);

        return { answerComment }
    }
}