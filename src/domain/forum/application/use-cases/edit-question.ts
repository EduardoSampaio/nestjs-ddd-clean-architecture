
import { Either, left, right } from '@/core/either';
import { UniqueEntityId } from '@/core/entities/unique-entity-id';

import { NotAllowedError } from '@/core/errors/errors/not-allowed-error';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { Question } from '../../enterprise/entities/question';
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachemnt-list';
import { QuestionAttachment } from '../../enterprise/entities/question-attachment';
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository';
import { QuestionsRepository } from '../repositories/questions-repository';

interface EditQuestionUseCaseRequest {
  authorId:string
  questionId:string
  title:string
  content:string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {
  question:Question
}>


export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionsRepository,
    private questionAttachmentRepository: QuestionAttachmentsRepository
  ) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds
  }: EditQuestionUseCaseRequest):Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionRepository.findById(questionId)

    if(!question){
      return left(new ResourceNotFoundError())
    }

    if(authorId !== question.authorId.toString()){
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId(questionId)
    
    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    
    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id,
      })
    })

    questionAttachmentList.update(questionAttachments)

    question.attachments = questionAttachmentList
    question.title = title
    question.content = content


    await this.questionRepository.save(question)

    return right({
      question
    })
  }
}
