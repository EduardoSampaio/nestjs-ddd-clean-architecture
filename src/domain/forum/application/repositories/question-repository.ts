import { PaginationParams } from "@/core/repositories/pagination-params";
import { Question } from "@/domain/forum/enterprise/entities/question";

export interface QuestionRepository {
    create(question: Question): Promise<void>
    save(question: Question): Promise<void>
    findBySlug(slug: string): Promise<Question | null>
    delete(question: Question): Promise<void>
    findById(id: string): Promise<Question | null>
    findManyRecent(params: PaginationParams): Promise<Question[]>
}