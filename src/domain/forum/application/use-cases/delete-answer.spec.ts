import { UniqueEntityId } from '@/core/entities/unique-entity-id'

import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerAttachments } from 'test/factories/make-answer-attachments'
import { InMemoryAnswerAttachmentsRepositories } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'

import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { DeleteAnswerUseCase } from './delete-answer'


let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let inMemoryAnswerAttachmentsRepositories: InMemoryAnswerAttachmentsRepositories
let sut : DeleteAnswerUseCase
describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepositories = new InMemoryAnswerAttachmentsRepositories()
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories(inMemoryAnswerAttachmentsRepositories)
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepositories)

  })
  
  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer1'));

    console.log(newAnswer)
    
    await inMemoryAnswersRepositories.create(newAnswer)

    inMemoryAnswerAttachmentsRepositories.items.push(
      makeAnswerAttachments({
        answerId:newAnswer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachments({
        answerId:newAnswer.id,
        attachmentId: new UniqueEntityId('2'),
      })
    )
  
    await sut.execute({
      answerId: 'answer1',
      authorId:'author-1'
    })
  
    expect(inMemoryAnswersRepositories.items).toHaveLength(0)
    expect(inMemoryAnswerAttachmentsRepositories.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer1'));

    console.log(newAnswer)
    
    await inMemoryAnswersRepositories.create(newAnswer)

    const result = await sut.execute({
      answerId: 'answer1',
      authorId:'author-2'
    })
  
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  
  })
  
})

