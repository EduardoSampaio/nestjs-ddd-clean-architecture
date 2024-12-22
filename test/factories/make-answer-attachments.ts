import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AnswerAttachment, AnswerAttachmentProps } from "@/domain/forum/enterprise/entities/answer-attachment";

export function makeAnswerAttachments(override:Partial<AnswerAttachmentProps> = {},id?:UniqueEntityId){
  const answerAttachments = AnswerAttachment.create({
    answerId:new UniqueEntityId(),
    attachmentId: new UniqueEntityId(),
    ...override,
  },id)

  return answerAttachments
}