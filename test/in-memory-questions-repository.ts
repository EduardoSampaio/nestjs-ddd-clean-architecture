import { QuestionRepository } from "@/domain/forum/application/repositories/question-repository";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionsRepository implements QuestionRepository {
    public items: Question[] = [];

    async create(question: Question): Promise<void> {
        this.items.push(question);
    }

    async findBySlug(slug: string): Promise<Question | null> {
        return this.items.find(question => question.slug.value === slug) ?? null;
    }

    async delete(question: Question): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === question.id);
        this.items.splice(itemIndex, 1);
    }
    async findById(id: string): Promise<Question | null> {
        return this.items.find(question => question.id === id) ?? null;
    }


    async save(question: Question): Promise<void> {
        const itemIndex = this.items.findIndex(item => item.id === question.id);
        this.items[itemIndex] = question
    }
}