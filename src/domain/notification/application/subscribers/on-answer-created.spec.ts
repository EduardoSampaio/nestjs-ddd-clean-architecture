import { makeAnswer } from "test/factories/make-answer"
import { makeQuestion } from "test/factories/make-question"
import { InMemoryAnswerAttachmentsRepositories } from "test/repositories/in-memory-answer-attachments-repository"
import { InMemoryAnswersRepositories } from "test/repositories/in-memory-answers-repository"
import { InMemoryNotificationRepositories } from "test/repositories/in-memory-notifications-repository"
import { InMemoryQuestionAttachmentsRepositories } from "test/repositories/in-memory-question-attachments-repository"
import { InMemoryQuestionsRepositories } from "test/repositories/in-memory-questions-repository"
import { waitFor } from "test/utils/wait-for"
import { MockInstance } from "vitest"
import { SendNotificationUseCase, SendNotificationUseCaseRequest, SendNotificationUseCaseResponse } from "../use-cases/send-notification"
import { OnAnswerCreated } from "./on-answer-created"

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepositories
let inMemoryQuestionsRepository: InMemoryQuestionsRepositories
let inMemoryAnswerAttachmentsRepositories: InMemoryAnswerAttachmentsRepositories
let inMemoryAnswersRepositories : InMemoryAnswersRepositories
let inMemoryNotificationsRepository: InMemoryNotificationRepositories
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On Answer Created', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
    new InMemoryQuestionAttachmentsRepositories()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepositories(
    inMemoryQuestionAttachmentsRepository,
    )
    inMemoryAnswerAttachmentsRepositories = new InMemoryAnswerAttachmentsRepositories()
    inMemoryAnswersRepositories = new InMemoryAnswersRepositories(inMemoryAnswerAttachmentsRepositories)
    inMemoryNotificationsRepository = new InMemoryNotificationRepositories()
    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })
  it('should send a notification when an answer is created' ,async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

     inMemoryQuestionsRepository.create(question)
     inMemoryAnswersRepositories.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})