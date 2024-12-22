import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeQuestion } from 'test/factories/make-question'
import { makeQuestionAttachments } from 'test/factories/make-question-attachments'
import { InMemoryQuestionAttachmentsRepositories } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'

let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let inMemoryQuestionAttachmentsRepositories : InMemoryQuestionAttachmentsRepositories
let sut : DeleteQuestionUseCase
describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepositories = new InMemoryQuestionAttachmentsRepositories()
    inMemoryQuestionsRepositories =  new InMemoryQuestionsRepositories(inMemoryQuestionAttachmentsRepositories)
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepositories)

  })
  
  it('should be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question1'));

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)

    inMemoryQuestionAttachmentsRepositories.items.push(
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
      questionId: 'question1',
      authorId:'author-1'
    })
  
    expect(inMemoryQuestionsRepositories.items).toHaveLength(0)
    expect(inMemoryQuestionAttachmentsRepositories.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question1'));

    console.log(newQuestion)
    
    await inMemoryQuestionsRepositories.create(newQuestion)

  const result = await sut.execute({
    questionId: 'question1',
    authorId:'author-2'
  })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
  
})

