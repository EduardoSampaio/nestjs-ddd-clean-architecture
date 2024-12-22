import { InMemoryNotificationRepositories } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'


let inMemoryNotificationsRepositories : InMemoryNotificationRepositories
let sut : SendNotificationUseCase
describe('Create Notification', () => {
  beforeEach(() => {

    inMemoryNotificationsRepositories =  new InMemoryNotificationRepositories()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepositories)

  })
  
  it(' should be able to send a notification', async () => {
  
    const result = await sut.execute({
      recipientId:'1',
      title:'Nova notificação',
      content:'Conteudo da notificação',
    })
  
    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepositories.items[0]).toEqual(result.value?.notification)
   
  })
})

