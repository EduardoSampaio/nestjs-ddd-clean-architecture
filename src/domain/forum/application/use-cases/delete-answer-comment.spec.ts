
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepositories } from 'test/repositories/in-memory-answers-comments'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'

let inMemoryAnswerCommentRepositories : InMemoryAnswerCommentRepositories
let sut : DeleteAnswerCommentUseCase
describe('Delete answer comment ', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepositories =  new InMemoryAnswerCommentRepositories()
    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentRepositories )

  })
  
  it('should be able to delete a answer comment ', async () => {
    const answerComment = makeAnswerComment()
  

    await inMemoryAnswerCommentRepositories.create(answerComment)
    
  
    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId:answerComment.authorId.toString()
    })
  
    expect(inMemoryAnswerCommentRepositories.items).toHaveLength(0)
  })

  it('should not be able to delete another user answer comment ', async () => {
    const answerComment = makeAnswerComment({
      authorId: new UniqueEntityId('author-1')
    })
  

    await inMemoryAnswerCommentRepositories.create(answerComment)
    
  
      const result = sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId:'author-2'
      })

    expect((await result).isLeft()).toBe(true)
    expect((await result).value).toBeInstanceOf(NotAllowedError)
  })

  
})

