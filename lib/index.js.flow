// @flow
import isEqual from 'lodash.isequal'

export interface Option<T> {
  get(): T,
  isEmpty(): boolean,
  isDefined(): boolean,
  contains(value: T): boolean,
  exists(predicate: (value: T) => boolean): boolean,
  filter(predicate: (value: T) => boolean): Option<T>,
  flatMap<U>(transformer: (value: T) => Option<U>): Option<U>,
  map<U>(transformer: (value: T) => U): Option<U>,
  // TODO: flatten<U>(): Option<U>;
  getOrElse(other: T): T,
  orNull(): T | null,

  match<U>(matcher: { some: (val: T) => U, none: () => U }): U
}

export class Some<T> implements Option<T> {
  value: T;

  constructor(val: T) {
    if (val === null || typeof val === 'undefined') {
      throw Error('Cannot create Some with an empty value: use flowtype!')
    }
    this.value = val
  }

  get(): T {
    return this.value
  }

  isEmpty(): boolean {
    return false
  }

  isDefined(): boolean {
    return true
  }

  contains(value: T): boolean {
    return isEqual(this.value, value)
  }

  exists(predicate: (value: T) => boolean): boolean {
    return predicate(this.value)
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    if (predicate(this.value)) {
      return this
    }
    return none
  }

  flatMap<U>(transformer: (value: T) => Option<U>): Option<U> {
    return transformer(this.value)
  }

  map<U>(transformer: (value: T) => U): Option<U> {
    return new Some(transformer(this.value))
  }

  getOrElse(other: T): T {
    return this.value
  }

  orNull(): T | null {
    return this.value
  }

  match<U>(matcher: { some: (val: T) => U, none: () => U }): U {
    return matcher.some(this.value)
  }
}

export class None<T> implements Option<T> {
  get(): T {
    throw Error('Cannot call get() on a None')
  }

  isEmpty(): boolean {
    return true
  }

  isDefined(): boolean {
    return false
  }

  contains(value: T): boolean {
    return false
  }

  exists(predicate: (value: T) => boolean): boolean {
    return false
  }

  filter(predicate: (value: T) => boolean): Option<T> {
    return none
  }

  flatMap<U>(transformer: (value: T) => Option<U>): Option<U> {
    return none
  }

  flatten<U>(): Option<U> {
    return none
  }

  map<U>(transformer: (value: T) => U): Option<U> {
    return none
  }

  getOrElse(other: T): T {
    return other
  }

  orNull(): T | null {
    return null
  }

  match<U>(matcher: { some: (val: T) => U, none: () => U }): U {
    return matcher.none()
  }
}
export const none: None<any> = Object.freeze(new None())

export function opt<T>(value: ?T): Option<T> {
  if (value === null || typeof value === 'undefined') {
    return none
  }

  return new Some(value)
}
