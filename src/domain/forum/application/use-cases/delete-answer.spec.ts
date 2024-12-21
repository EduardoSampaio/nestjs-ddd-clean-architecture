
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { Answer } from '../../enterprise/entities/answer';
import { faker } from '@faker-js/faker'
import { DeleteAnswerUseCase } from './delete-answer';
import { InMemoryAnswerRepository } from 'test/in-memory-anwser-repository';
import { NotAllowedError } from './errors/not-allowed-error';

describe('Delete Answer By Id', () => {
    let fakeRepository: InMemoryAnswerRepository;
    let sut: DeleteAnswerUseCase;

    beforeEach(() => {
        fakeRepository = new InMemoryAnswerRepository();
        sut = new DeleteAnswerUseCase(fakeRepository);
    })

    test('Should delete a answer by id', async () => {

        const newAnswer = Answer.create({
            authorId: new UniqueEntityId('author-1'),
            content: faker.lorem.text(),
            questionId: new UniqueEntityId('question-1'),
        }, new UniqueEntityId('answer-1'))

        await fakeRepository.create(newAnswer);

        await sut.execute({ authorId: 'author-1', answerId: 'answer-1' });

        expect(fakeRepository.items).toHaveLength(0);
    })


    test('Should not delete a answer by id', async () => {

        const newAnswer = Answer.create({
            authorId: new UniqueEntityId('author-2'),
            content: faker.lorem.text(),
            questionId: new UniqueEntityId('question-1'),
        }, new UniqueEntityId('answer-1'))

        await fakeRepository.create(newAnswer);
        const result = await sut.execute({ authorId: 'author-1', answerId: 'answer-1' });

        expect(result.isLeft()).toBe(true)
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })

})