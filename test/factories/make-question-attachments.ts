import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachments(override:Partial<QuestionAttachmentProps> = {},id?:UniqueEntityId){
  const questionAttachments = QuestionAttachment.create({
    questionId:new UniqueEntityId(),
    attachmentId: new UniqueEntityId(),
    ...override,
  },id)

  return questionAttachments
}