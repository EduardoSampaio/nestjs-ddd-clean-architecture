import { PaginationParams } from "@/core/repositories/pagination-params";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export interface AnswersRepository {
    create(answer: Answer): Promise<void>
    save(question: Answer): Promise<void>
    delete(answer: Answer): Promise<void>
    findById(id: string): Promise<Answer | null>
    findManyByQuestionId(questionId: string, { page }: PaginationParams): Promise<Answer[]>
}