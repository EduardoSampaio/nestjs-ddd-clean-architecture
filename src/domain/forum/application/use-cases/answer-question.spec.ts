import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';
import { InMemoryAnswerRepository } from 'test/in-memory-anwser-repository';

describe('Create Question', () => {
    let fakeRepository: AnswersRepository;
    let sut: AnswerQuestionUseCase;

    beforeEach(() => {
        fakeRepository = new InMemoryAnswerRepository();
        sut = new AnswerQuestionUseCase(fakeRepository);
    })

    test('create an answer', async () => {

        const answer = await sut.execute({
            questionId: '1',
            instructorId: '1',
            content: 'Nova Reposta'
        })

        expect(answer.content).toEqual('Nova Reposta')
    })

})