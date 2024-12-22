
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepositories } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'

let inMemoryAnswerAttachmentsRepositories : InMemoryAnswerAttachmentsRepositories
let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let sut : AnswerQuestionUseCase
describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepositories = new InMemoryAnswerAttachmentsRepositories()
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories(inMemoryAnswerAttachmentsRepositories)
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepositories)
  })
  
  it(' should be able to create a answer', async () => {
  
    const result = await sut.execute({
      questionId:'1',
      instructorId:'1',
      content:'Conteudo da resposta',
      attachmentIds: ['1','2']
    })
  
    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepositories.items[0]).toEqual(result.value?.answer)
    expect(inMemoryAnswersRepositories.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswersRepositories.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
    ])
  
  })
  
})

