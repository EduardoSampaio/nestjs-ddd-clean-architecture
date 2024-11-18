import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
import { faker } from '@faker-js/faker'
import { DeleteQuestionUseCase } from './delete-question';

describe('Delete Question By Id', () => {
    let fakeRepository: InMemoryQuestionsRepository;
    let sut: DeleteQuestionUseCase;

    beforeEach(() => {
        fakeRepository = new InMemoryQuestionsRepository();
        sut = new DeleteQuestionUseCase(fakeRepository);
    })

    test('Should delete a question by id', async () => {

        const newQuestion = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-1'),
            authorId: new UniqueEntityId('author-1'),
            content: faker.lorem.text(),
        }, new UniqueEntityId('question-1'))

        await fakeRepository.create(newQuestion);

        await sut.execute({ authorId: 'author-1', questionId: 'question-1' });

        expect(fakeRepository.items).toHaveLength(0);
    })


    test('Should not delete a question by id', async () => {

        const newQuestion = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-1'),
            authorId: new UniqueEntityId('author-2'),
            content: faker.lorem.text(),
        }, new UniqueEntityId('question-1'))

        await fakeRepository.create(newQuestion);

        expect(() => {
            return sut.execute({ authorId: 'author-1', questionId: 'question-1' })
        }).rejects.toBeInstanceOf(Error);

    })

})