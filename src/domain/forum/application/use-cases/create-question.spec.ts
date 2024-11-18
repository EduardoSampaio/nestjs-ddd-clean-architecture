
import { CreateQuestionUseCase } from './create-question';
import { QuestionRepository } from '../repositories/question-repository';
import { InMemoryQuestionsRepository } from 'test/in-memory-questions-repository';


describe('Create Question', () => {
    let fakeRepository: QuestionRepository;
    let sut: CreateQuestionUseCase;

    beforeEach(() => {
        fakeRepository = new InMemoryQuestionsRepository();
        sut = new CreateQuestionUseCase(fakeRepository);
    })

    test('create an answer', async () => {
        const { question } = await sut.execute({
            title: 'Nova pergunta',
            authorId: '1',
            content: 'Nova Reposta'
        })

        expect(question.content).toEqual('Nova Reposta');
    })

})