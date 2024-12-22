import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { Notification, NotificationProps } from "@/domain/notification/enterprise/entities/notification";
import { faker } from '@faker-js/faker';

export function makeNotification(override:Partial<NotificationProps> = {},id?:UniqueEntityId){
  const notification = Notification.create({
    title: faker.lorem.sentence(4),
    recipientId:new UniqueEntityId(),
    content:faker.lorem.sentence(4),
    ...override,
  },id)

  return notification
}