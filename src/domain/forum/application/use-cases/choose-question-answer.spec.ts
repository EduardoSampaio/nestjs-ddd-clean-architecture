import { Slug } from '../../enterprise/entities/value-objects/slug';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository';
import { Question } from '../../enterprise/entities/question';
import { faker } from '@faker-js/faker'
import { InMemoryAnswerRepository } from 'test/in-memory-anwser-repository';
import { ChooseBestQuestionUseCase } from './choose-question-best-answer';
import { Answer } from '../../enterprise/entities/answer';
import { b } from 'vitest/dist/chunks/suite.B2jumIFP';

describe('Choose Question Best Answer', () => {
    let fakeRepositoryQuestion: InMemoryQuestionsRepository;
    let fakeRepositoryAnswer: InMemoryAnswerRepository;
    let sut: ChooseBestQuestionUseCase;

    beforeEach(() => {
        fakeRepositoryQuestion = new InMemoryQuestionsRepository();
        fakeRepositoryAnswer = new InMemoryAnswerRepository();
        sut = new ChooseBestQuestionUseCase(fakeRepositoryAnswer, fakeRepositoryQuestion);
    })

    test('Should be able to get best answer', async () => {

        const newQuestion = Question.create({
            title: faker.lorem.sentences(),
            slug: Slug.create('pergunta-1'),
            authorId: new UniqueEntityId('author-1'),
            content: faker.lorem.text(),
        }, new UniqueEntityId('pergunta-1'))

        const answer = Answer.create({
            content: faker.lorem.text(),
            authorId: new UniqueEntityId('author-1'),
            questionId: new UniqueEntityId('pergunta-1'),
        }, new UniqueEntityId('resposta-1'))

        await fakeRepositoryQuestion.create(newQuestion);
        await fakeRepositoryAnswer.create(answer);

        await sut.execute({
            answerId: 'resposta-1',
            authorId: 'author-1'
        })

        expect(fakeRepositoryQuestion.items[0]).toMatchObject({
            bestAnswerId: new UniqueEntityId('resposta-1')
        });
    })

})