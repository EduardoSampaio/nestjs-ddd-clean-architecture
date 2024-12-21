import { Either, left, right } from "./either"

function doSomething(success: boolean): Either<string, number> {
    if (success) {
        return right('success');
    } else {
        return left('error');
    }
}

test('success result', () => {
    const success = doSomething(true);

    expect(success.value).toEqual('success');
})

test('error result', () => {
    const error = doSomething(false);

    expect(error.value).toEqual('error');
})