import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepositories } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepositories } from 'test/repositories/in-memory-questions-repository'
import { FetchRecenteQuestionsUseCase } from './fetch-recent-questions'

let inMemoryQuestionAttachmentsRepositories : InMemoryQuestionAttachmentsRepositories
let inMemoryQuestionsRepositories : InMemoryQuestionsRepositories
let sut : FetchRecenteQuestionsUseCase
describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepositories = new InMemoryQuestionAttachmentsRepositories()
    inMemoryQuestionsRepositories =  new InMemoryQuestionsRepositories(inMemoryQuestionAttachmentsRepositories)
    sut = new FetchRecenteQuestionsUseCase(inMemoryQuestionsRepositories)

  })
  
  it('should be able to fetch recent questions', async () => {
   await inMemoryQuestionsRepositories.create(makeQuestion({
    created_at: new Date(2022,0,20)
   })) 
   await inMemoryQuestionsRepositories.create(makeQuestion({
    created_at: new Date(2022,0,18)
   })) 
   await inMemoryQuestionsRepositories.create(makeQuestion({
    created_at: new Date(2022,0,23)
   })) 

    const result = await sut.execute({
      page:1
    })   

    expect(result.value?.questions).toEqual([
      expect.objectContaining({created_at: new Date(2022,0,23)}),
      expect.objectContaining({created_at: new Date(2022,0,20)}),
      expect.objectContaining({created_at: new Date(2022,0,18)})
    ])
  })

   
  it('should be able to fetch pagination recent questions', async () => {
    for (let i =1; i <= 22; i++){
      await inMemoryQuestionsRepositories.create(makeQuestion())
    }

     const result = await sut.execute({
       page:2,
     })   
 
     expect(result.value?.questions).toHaveLength(2)
   })
  
})

