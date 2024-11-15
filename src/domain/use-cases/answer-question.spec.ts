import { expect, test } from 'vitest'
import { AnswerQuestionUseCase } from './answer-question';
import { AnswersRepository } from '../repositories/answers-repository';
import { Answer } from '../entities/answer';

const fakeRepository: AnswersRepository = {
    create: async (answer: Answer) => {
        return;
    }
}

test('create an answer', async () => {
    const answerQuestion = new AnswerQuestionUseCase(fakeRepository);
    const answer = await answerQuestion.execute({
        questionId: '1',
        instructorId: '1',
        content: 'Nova Reposta'
    })

    expect(answer.content).toEqual('Nova Reposta')
})