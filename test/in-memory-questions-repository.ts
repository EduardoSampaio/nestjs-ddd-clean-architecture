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
}