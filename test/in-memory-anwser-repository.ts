import { PaginationParams } from "@/core/repositories/pagination-params";
import { AnswersRepository } from "@/domain/forum/application/repositories/answers-repository";
import { Answer } from "@/domain/forum/enterprise/entities/answer";


export class InMemoryAnswerRepository implements AnswersRepository {

    public items: Answer[] = [];

    async create(answer: Answer): Promise<void> {
        this.items.push(answer);
    }

    async delete(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === answer.id);
        this.items.splice(itemIndex, 1);
    }
    async findById(id: string): Promise<Answer | null> {
        return this.items.find(answer => answer.id === id) ?? null;
    }

    async save(answer: Answer): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === answer.id);
        this.items[itemIndex] = answer
    }

    async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
        return this.items.filter(answer => answer.questionId.toValue === questionId).slice((page - 1) * 20, page * 20);
    }
}