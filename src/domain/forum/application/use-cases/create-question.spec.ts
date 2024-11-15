
import { CreateQuestionUseCase } from './create-question';
import { QuestionRepository } from '../repositories/question-repository';

const fakeRepository: QuestionRepository = {
    create: async () => {

    }
}

test('create an answer', async () => {
    const questionUseCase = new CreateQuestionUseCase(fakeRepository);
    const { question } = await questionUseCase.execute({
        title: 'Nova pergunta',
        authorId: '1',
        content: 'Nova Reposta'
    })

    expect(question.content).toEqual('Nova Reposta')
})