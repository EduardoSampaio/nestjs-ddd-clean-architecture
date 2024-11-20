import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
import { faker } from '@faker-js/faker'
import { EditQuestionUseCase } from './edit-question';

describe('Edit Question By Id', () => {
    let fakeRepository: InMemoryQuestionsRepository;
    let sut: EditQuestionUseCase;

    beforeEach(() => {
        fakeRepository = new InMemoryQuestionsRepository();
        sut = new EditQuestionUseCase(fakeRepository);
    })

    test('Should edit a question by id', async () => {

        const newQuestion = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-1'),
            authorId: new UniqueEntityId('author-1'),
            content: faker.lorem.text(),
        }, new UniqueEntityId('question-1'))

        await fakeRepository.create(newQuestion);

        await sut.execute({
            authorId: 'author-1',
            questionId: 'question-1',
            title: 'Pergunta 2',
            content: 'Conteudo 2',
        });

        expect(fakeRepository.items[0]).toMatchObject({
            title: 'Pergunta 2',
            content: 'Conteudo 2',
        });
    })


    test('Should not edit a question by id', async () => {

        const newQuestion = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-1'),
            authorId: new UniqueEntityId('author-2'),
            content: faker.lorem.text(),
        }, new UniqueEntityId('question-1'))

        await fakeRepository.create(newQuestion);

        expect(() => {
            return sut.execute({
                authorId: 'author-1',
                questionId: 'question-1',
                title: faker.lorem.sentences(),
                content: faker.lorem.text(),
            });
        }).rejects.toBeInstanceOf(Error);

    })

})