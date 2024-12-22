import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepositories } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'


let inMemoryAnswerAttachmentsRepositories : InMemoryAnswerAttachmentsRepositories
let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let sut : FetchQuestionAnswersUseCase
describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepositories = new InMemoryAnswerAttachmentsRepositories()
    inMemoryAnswersRepositories =  new InMemoryAnswersRepositories(inMemoryAnswerAttachmentsRepositories)
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepositories)

  })
  
  it('should be able to fetch questions answers', async () => {
   await inMemoryAnswersRepositories.create(makeAnswer({
    questionId: new UniqueEntityId('question-1')
   })) 
   await inMemoryAnswersRepositories.create(makeAnswer({
    questionId: new UniqueEntityId('question-1')
   })) 
   await inMemoryAnswersRepositories.create(makeAnswer({
    questionId: new UniqueEntityId('question-1')
   })) 

    const result = await sut.execute({
      questionId:'question-1',
      page:1
    })   

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch pagination questions answers', async () => {
    for (let i =1; i <= 22; i++){
      await inMemoryAnswersRepositories.create(makeAnswer({
        questionId: new UniqueEntityId('question-1')
      }))
    }

     const result = await sut.execute({
      questionId:'question-1',
      page:2,
     })   
 
     expect(result.value?.answers).toHaveLength(2)
   })
  
})