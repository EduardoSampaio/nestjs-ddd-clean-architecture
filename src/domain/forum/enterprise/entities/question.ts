import { AggregateRoot } from '@/core/entities/aggregate-root'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import dayjs from 'dayjs'
import { QuestionBestAnswerChosenEvent } from '../events/question-best-answer-chosen-event'
import { QuestionAttachmentList } from './question-attachemnt-list'
import { Slug } from './value-objects/slug'

export interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId?: UniqueEntityId
  attachments: QuestionAttachmentList
  title: string
  content: string
  slug: Slug
  created_at: Date
  updated_at?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get bestAnswerId() {
    return this.props.bestAnswerId
  }

  get attachments() {
    return this.props.attachments
  }


  get title() {
    return this.props.title
  }

  get slug() {
    return this.props.slug
  }

  get created_at() {
    return this.props.created_at
  }

  get updated_at() {
    return this.props.updated_at
  }

  get isNew(): boolean {
    return dayjs().diff(this.created_at, 'days') <= 3
  }

  get except() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch
  }

  set content(content: string) {
    this.props.content = content
    this.touch
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId | undefined) {
    if(bestAnswerId === undefined){
      return
    }

    if(this.props.bestAnswerId == undefined || !this.props.bestAnswerId.equals(bestAnswerId)){
      this.addDomainEvents(new QuestionBestAnswerChosenEvent(this,bestAnswerId))
    }
    
    this.props.bestAnswerId = bestAnswerId
    this.touch
  }

  set attachments(attachments: QuestionAttachmentList) {
    this.props.attachments = attachments
    this.touch
  }
  static create(
    props: Optional<QuestionProps, 'created_at' | 'slug' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        attachments: props.attachments ?? new QuestionAttachmentList(),
        created_at:props.created_at ?? new Date(),
      },
      id,
    )

    return question
  }
}
