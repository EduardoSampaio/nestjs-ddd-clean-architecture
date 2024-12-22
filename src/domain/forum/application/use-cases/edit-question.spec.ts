import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionAttachments } from 'test/factories/make-question-attachments'
import { InMemoryQuestionAttachmentsRepositories } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let inMemoryQuestionAttachmentRepositories : InMemoryQuestionAttachmentsRepositories
let sut : EditQuestionUseCase
describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepositories = new InMemoryQuestionAttachmentsRepositories()
    inMemoryQuestionsRepositories =  new InMemoryQuestionsRepositories(inMemoryQuestionAttachmentRepositories)
    sut = new EditQuestionUseCase(inMemoryQuestionsRepositories,inMemoryQuestionAttachmentRepositories)

  })
  
  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question1'));

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)

    inMemoryQuestionAttachmentRepositories.items.push(
      makeQuestionAttachments({
        questionId:newQuestion.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachments({
        questionId:newQuestion.id,
        attachmentId: new UniqueEntityId('2'),
      })
    )
  
    await sut.execute({
      authorId:'author-1',
      title:'Pergunta teste',
      content:'Conteudo teste',
      questionId: newQuestion.id.toValue(),
      attachmentsIds: ['1', '3']
    })
  
    expect(inMemoryQuestionsRepositories.items[0]).toMatchObject({
      title:'Pergunta teste',
      content:'Conteudo teste',
    })
    expect(inMemoryQuestionsRepositories.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryQuestionsRepositories.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })


  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question1'));

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)
    const result = await sut.execute({
    authorId:'author-2',
    title:'Pergunta teste',
    content:'Conteudo teste',
    questionId: newQuestion.id.toValue(),
    attachmentsIds: []
    })

  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(NotAllowedError)
  })
  
})

