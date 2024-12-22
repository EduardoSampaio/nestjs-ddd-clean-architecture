import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentRepositories } from 'test/repositories/in-memory-answers-comments'
import { FetchAnswerCommentUseCase } from './fetch-answer-comments'

let inMemoryAnswerCommentRepositories : InMemoryAnswerCommentRepositories
let sut : FetchAnswerCommentUseCase
describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepositories =  new InMemoryAnswerCommentRepositories()
    sut = new FetchAnswerCommentUseCase(inMemoryAnswerCommentRepositories)

  })
  
  it('should be able to fetch answers comments', async () => {
   await inMemoryAnswerCommentRepositories.create(makeAnswerComment({
    answerId: new UniqueEntityId('answer-1').toString()
   })) 
  
   await inMemoryAnswerCommentRepositories.create(makeAnswerComment({
    answerId: new UniqueEntityId('answer-1').toString()
   })) 
  
   await inMemoryAnswerCommentRepositories.create(makeAnswerComment({
    answerId: new UniqueEntityId('answer-1').toString()
   })) 
  

    const result = await sut.execute({
      answerId:'answer-1',
      page:1
    })   

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch pagination answers comments', async () => {
    for (let i =1; i <= 22; i++){
      await inMemoryAnswerCommentRepositories.create(makeAnswerComment({
        answerId: new UniqueEntityId('answer-1').toString()
      }))
    }

    const result = await  sut.execute({
      answerId:'answer-1',
      page:2,
     })   
 
     expect(result.value?.answerComments).toHaveLength(2)
   })
  
})