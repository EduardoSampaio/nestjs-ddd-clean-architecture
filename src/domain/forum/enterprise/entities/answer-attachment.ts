import { UniqueEntityId } from './value-objects/unique-entity-id';
import { Entity } from '@/core/entities/entity';

interface AnswerAttachmentProps {
    answerId: UniqueEntityId;
    attachmentId: UniqueEntityId;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {

    getanswerId() {
        return this.props.answerId;
    }

    get attachmentId() {
        return this.props.attachmentId;
    }

    static create(props: AnswerAttachmentProps, id?: UniqueEntityId) {
        return new AnswerAttachment(props, id);
    }
}