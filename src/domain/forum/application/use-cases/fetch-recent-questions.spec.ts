import { faker } from '@faker-js/faker';

import { InMemoryQuestionsRepository } from "test/in-memory-questions-repository";
import { Question } from "../../enterprise/entities/question";
import { Slug } from "../../enterprise/entities/value-objects/slug";
import { UniqueEntityId } from "../../enterprise/entities/value-objects/unique-entity-id";
import { QuestionRepository } from "../repositories/question-repository";
import { FetchRecentQuestionUseCase } from "./fetch-recent-questions";

describe('Fetch Recent Questions', () => {
    let fakeRepository: QuestionRepository;
    let sut: FetchRecentQuestionUseCase;

    beforeEach(() => {
        fakeRepository = new InMemoryQuestionsRepository();
        sut = new FetchRecentQuestionUseCase(fakeRepository);
    })

    test('Should be able to get a fetch recent question', async () => {

        const newQuestion1 = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-1'),
            authorId: new UniqueEntityId(),
            content: faker.lorem.text(),
            createdAt: new Date(2022, 0, 20)
        })


        await fakeRepository.create(newQuestion1);

        const newQuestion2 = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-2'),
            authorId: new UniqueEntityId(),
            content: faker.lorem.text(),
            createdAt: new Date(2022, 0, 18)
        })

        await fakeRepository.create(newQuestion2);

        const newQuestion3 = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-3'),
            authorId: new UniqueEntityId(),
            content: faker.lorem.text(),
            createdAt: new Date(2022, 0, 23)
        })

        await fakeRepository.create(newQuestion3);

        const { questions } = await sut.execute({ page: 1 });

        expect(questions).toEqual([
            expect.objectContaining({ createdAt: new Date(2022, 0, 23) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
            expect.objectContaining({ createdAt: new Date(2022, 0, 18) })
        ])
    })


    test('Should be able to get a fetch paginated recent question', async () => {

        for (let i = 1; i <= 22; i++) {
            const newQuestion = Question.create({
                title: faker.lorem.sentences(),
                slug: Slug.create(`pergunta-${i}`),
                authorId: new UniqueEntityId(),
                content: faker.lorem.text(),
            })

            await fakeRepository.create(newQuestion);
        }

        const { questions } = await sut.execute({ page: 2 });

        expect(questions).toHaveLength(2);
    })
})