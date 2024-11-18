import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionRepository } from '../repositories/question-repository';
import { GetQuestionBySlugUseCase } from './get-question.by-slug';
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
import { faker } from '@faker-js/faker'

describe('Get Question By Slug', () => {
    let fakeRepository: QuestionRepository;
    let sut: GetQuestionBySlugUseCase;

    beforeEach(() => {
        fakeRepository = new InMemoryQuestionsRepository();
        sut = new GetQuestionBySlugUseCase(fakeRepository);
    })

    test('Should be able to get a question', async () => {

        const newQuestion = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-1'),
            authorId: new UniqueEntityId(),
            content: faker.lorem.text(),
        })

        await fakeRepository.create(newQuestion);

        const { question } = await sut.execute({ slug: 'pergunta-1' });

        expect(question).toBeTruthy();
    })

})