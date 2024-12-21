
import { Either, left, right } from "@/core/either";
import { AnswersRepository } from "../repositories/answers-repository";

interface DeleteAnswerUseCaseRequest {
    authorId: string
    answerId: string
}

type DeleteAnswerUseCaseResponse = Either<string, {}>

export class DeleteAnswerUseCase {
    constructor(private answerRepository: AnswersRepository) { }
    async execute({ authorId, answerId }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId);

        if (!answer) {
            return left('Answer not found');
        }

        if (answer.authorId.toValue !== authorId) {
            return left('Not allowed');
        }

        await this.answerRepository.delete(answer)

        return right({})
    }
}