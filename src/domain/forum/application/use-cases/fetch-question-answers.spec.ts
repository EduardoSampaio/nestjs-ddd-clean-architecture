
import { InMemoryAnswerRepository } from "test/in-memory-anwser-repository"
import { FetchQuestionAnswersUseCase } from "./fetch-question-answers"
import { AnswersRepository } from "../repositories/answers-repository"
import { UniqueEntityId } from "../../enterprise/entities/value-objects/unique-entity-id"
import { Answer } from "../../enterprise/entities/answer"


describe('Fetch Question Answers', () => {

  let inMemoryAnswersRepositories: AnswersRepository
  let sut: FetchQuestionAnswersUseCase
  beforeEach(() => {

    inMemoryAnswersRepositories = new InMemoryAnswerRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepositories)

  })

  it('should be able to fetch questions answers', async () => {
    const newAnswer1 = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId('question-1'),
      content: 'nova resposta',
      createdAt: new Date(2022, 0, 20)
    })

    await inMemoryAnswersRepositories.create(newAnswer1)

    const newAnswer2 = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId('question-1'),
      content: 'nova resposta',
      createdAt: new Date(2022, 0, 20)
    })

    await inMemoryAnswersRepositories.create(newAnswer2)

    const newAnswer3 = Answer.create({
      authorId: new UniqueEntityId(),
      questionId: new UniqueEntityId('question-1'),
      content: 'nova resposta',
      createdAt: new Date(2022, 0, 20)
    })

    await inMemoryAnswersRepositories.create(newAnswer3)

    const { answers } = await sut.execute({ page: 1, questionId: 'question-1' })

    expect(answers).toHaveLength(3)
  })
})