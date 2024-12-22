

import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepositories } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswerCommentRepositories } from 'test/repositories/in-memory-answers-comments'
import { InMemoryAnswersRepositories } from 'test/repositories/in-memory-answers-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerAttachmentsRepositories : InMemoryAnswerAttachmentsRepositories
let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let inMemoryAnswerCommentRepositories : InMemoryAnswerCommentRepositories
let sut : CommentOnAnswerUseCase
describe('Comment on answer ', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepositories = new InMemoryAnswerAttachmentsRepositories()
    inMemoryAnswersRepositories = new InMemoryAnswersRepositories(inMemoryAnswerAttachmentsRepositories)
    inMemoryAnswerCommentRepositories =  new InMemoryAnswerCommentRepositories()
    sut = new CommentOnAnswerUseCase(inMemoryAnswersRepositories,inMemoryAnswerCommentRepositories )

  })
  
  it('should be able to comment on answer ', async () => {
    const answer = makeAnswer()
  

    await inMemoryAnswersRepositories.create(answer)
    
  
    await sut.execute({
      answerId: answer.id.toString(),
      authorId:answer.authorId.toString(),
      content:'Teste',
    })
  
    expect(inMemoryAnswerCommentRepositories.items[0].content).toEqual('Teste')
  })

  
})

