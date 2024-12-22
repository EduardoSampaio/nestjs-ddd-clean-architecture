import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentRepositories } from 'test/repositories/in-memory-question-comments'
import { FetchQuestionCommentUseCase } from './fetch-question-comments'

let inMemoryQuestionCommentRepositories : InMemoryQuestionCommentRepositories
let sut : FetchQuestionCommentUseCase
describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepositories =  new InMemoryQuestionCommentRepositories()
    sut = new FetchQuestionCommentUseCase(inMemoryQuestionCommentRepositories)

  })
  
  it('should be able to fetch questions comments', async () => {
   await inMemoryQuestionCommentRepositories.create(makeQuestionComment({
    questionId: new UniqueEntityId('question-1').toString()
   })) 
  
   await inMemoryQuestionCommentRepositories.create(makeQuestionComment({
    questionId: new UniqueEntityId('question-1').toString()
   })) 
  
   await inMemoryQuestionCommentRepositories.create(makeQuestionComment({
    questionId: new UniqueEntityId('question-1').toString()
   })) 
  

    const result = await sut.execute({
      questionId:'question-1',
      page:1
    })   

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch pagination questions comments', async () => {
    for (let i =1; i <= 22; i++){
      await inMemoryQuestionCommentRepositories.create(makeQuestionComment({
        questionId: new UniqueEntityId('question-1').toString()
      }))
    }

     const result = await sut.execute({
      questionId:'question-1',
      page:2,
     })   
 
     expect(result.value?.questionComments).toHaveLength(2)
   })
  
})