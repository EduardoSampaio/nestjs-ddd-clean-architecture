import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswerAttachmentsRepositories } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { InMemoryQuestionAttachmentsRepositories } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-answer-best'

let inMemoryAnswerAttachmentsRepositories : InMemoryAnswerAttachmentsRepositories
let inMemoryQuestionAttachmentsRepositories : InMemoryQuestionAttachmentsRepositories
let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let sut : ChooseQuestionBestAnswerUseCase
describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepositories = new InMemoryAnswerAttachmentsRepositories()
    inMemoryQuestionAttachmentsRepositories = new InMemoryQuestionAttachmentsRepositories()
    inMemoryQuestionsRepositories = new InMemoryQuestionsRepositories(inMemoryQuestionAttachmentsRepositories)
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories(inMemoryAnswerAttachmentsRepositories)
    sut = new ChooseQuestionBestAnswerUseCase(inMemoryAnswersRepositories,inMemoryQuestionsRepositories)

  })
  
  it('should be able to choose question best answer ', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepositories.create(question)
    await inMemoryAnswersRepositories.create(answer)
  
    await sut.execute({
      answerId: answer.id.toString(),
      authorId:question.authorId.toString()
    })
  
    expect(inMemoryQuestionsRepositories.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('should not be able to choose a best question answer from another user', async () => {
    const question = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    })
    const answer = makeAnswer({
      questionId: question.id
    })

    await inMemoryQuestionsRepositories.create(question)
    await inMemoryAnswersRepositories.create(answer)

    const result =  await sut.execute({
      answerId: answer.id.toString(),
      authorId:'author-2'
    })
  
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  
})

})