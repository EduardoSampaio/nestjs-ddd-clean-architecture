import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeNotification } from 'test/factories/make-notification'
import { InMemoryNotificationRepositories } from 'test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'


let inMemoryNotificationsRepositories : InMemoryNotificationRepositories
let sut : ReadNotificationUseCase
describe('Read Notification', () => {
  beforeEach(() => {

    inMemoryNotificationsRepositories =  new InMemoryNotificationRepositories()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepositories)

  })
  
  it(' should be able to read a notification', async () => {

    const notification = makeNotification()

    inMemoryNotificationsRepositories.create(notification)
  
    const result = await sut.execute({
      recipientId:notification.recipientId.toString(),
      notificationId: notification.id.toString(),
    })

  
    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepositories.items[0].readAt).toEqual(expect.any(Date))
   
  })

  
  it('should not be able to read a notification from another user', async () => {
    const notification = makeNotification({
      recipientId: new UniqueEntityId('1')
    });
    
    inMemoryNotificationsRepositories.create(notification)

    const result = await sut.execute({
      notificationId: notification.id.toString(),
      recipientId:'2'
    })
  
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  
  })
})

