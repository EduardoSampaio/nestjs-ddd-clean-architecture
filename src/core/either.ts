/**
 * Error
 */
class Left<L> {
    readonly value: L

    constructor(value: L) {
        this.value = value
    }
}

/**
 * Success
 */
class Right<R> {
    readonly value: R

    constructor(value: R) {
        this.value = value
    }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: L): Either<L, R> => new Left(value)

export const right = <L, R>(value: R): Either<L, R> => new Right(value)