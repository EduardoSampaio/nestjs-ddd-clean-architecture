import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerAttachments } from 'test/factories/make-answer-attachments'
import { InMemoryAnswerAttachmentsRepositories } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryAnswerAttachmentsRepositories : InMemoryAnswerAttachmentsRepositories
let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let sut : EditAnswerUseCase
describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepositories = new InMemoryAnswerAttachmentsRepositories()
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories(inMemoryAnswerAttachmentsRepositories)
    sut = new EditAnswerUseCase(inMemoryAnswersRepositories,inMemoryAnswerAttachmentsRepositories)

  })
  
  it('should be able to edit a answer', async () => {
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
      authorId:'author-1',
      content:'Conteudo teste',
      answerId: newAnswer.id.toValue(),
      attachmentsIds: ['1','3']
    })
  
    expect(inMemoryAnswersRepositories.items[0]).toMatchObject({
      content:'Conteudo teste',
    })
    expect(inMemoryAnswersRepositories.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryAnswersRepositories.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer1'));

    console.log(newAnswer)
    
    await inMemoryAnswersRepositories.create(newAnswer)
  const result = await sut.execute({
    authorId:'author-2',
    content:'Conteudo teste',
    answerId: newAnswer.id.toValue(),
    attachmentsIds: []
  })

  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(NotAllowedError)
  })
  
})

