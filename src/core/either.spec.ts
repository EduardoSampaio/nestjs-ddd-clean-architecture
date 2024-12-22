import { Either, left, right } from "./either"

function doSomething(shouldSuccess: boolean): Either<string,number>{
  if(shouldSuccess){
    return right(10)
  }else{
    return left('error')
  }
}

test('success result', () => {
  const successResult = doSomething(true) 

  expect(successResult.isRight()).toBe(true)
  expect(successResult.isLeft()).toBe(false)
})

test('error result', () => {
  const successResult = doSomething(false) 

  expect(successResult.isRight()).toBe(false)
  expect(successResult.isLeft()).toBe(true)
})