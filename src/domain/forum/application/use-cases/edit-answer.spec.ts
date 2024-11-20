import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { faker } from '@faker-js/faker'
import { InMemoryAnswerRepository } from 'test/in-memory-anwser-repository';
import { EditAnswerUseCase } from './edit-answer';
import { Answer } from '../../enterprise/entities/answer';

describe('Edit Question By Id', () => {
    let fakeRepository: InMemoryAnswerRepository;
    let sut: EditAnswerUseCase;

    beforeEach(() => {
        fakeRepository = new InMemoryAnswerRepository();
        sut = new EditAnswerUseCase(fakeRepository);
    })

    test('Should edit a answer by id', async () => {

        const newQuestion = Answer.create({
            content: faker.lorem.sentences(),
            authorId: new UniqueEntityId('author-1'),
            questionId: new UniqueEntityId('question-1'),
        }, new UniqueEntityId('answer-1'))

        await fakeRepository.create(newQuestion);

        const { answer } = await sut.execute({
            authorId: 'author-1',
            answerId: 'answer-1',
            content: 'content 2',
        });

        expect(answer).toMatchObject({
            content: 'content 2',
        });
    })


    test('Should not edit a answer by id', async () => {

        const newQuestion = Answer.create({
            content: faker.lorem.sentences(),
            authorId: new UniqueEntityId('author-2'),
            questionId: new UniqueEntityId('question-1'),
        }, new UniqueEntityId('answer-1'))

        await fakeRepository.create(newQuestion);

        expect(() => {
            return sut.execute({
                authorId: 'author-1',
                answerId: 'answer-1',
                content: 'Conteudo 2',
            });
        }).rejects.toBeInstanceOf(Error);

    })

})