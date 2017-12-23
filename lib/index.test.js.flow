// @flow

import { option, none, Some, None, type Option } from './'

test('valid values', () => {
  const x: Option<*> = option(1)
  expect(x.isDefined()).toBe(true)
  expect(x.isEmpty()).toBe(false)
  const y = option(0)
  expect(y.isDefined()).toBe(true)
  expect(y.isEmpty()).toBe(false)
  const z = option({})
  expect(z.isDefined()).toBe(true)
  expect(z.isEmpty()).toBe(false)
})

test('empty values', () => {
  const x = option(null)
  expect(x.isEmpty()).toBe(true)
  expect(x.isDefined()).toBe(false)
  const y = option(undefined)
  expect(y.isEmpty()).toBe(true)
  expect(y.isDefined()).toBe(false)
})

test('extract value with get()', () => {
  const m = option('some value')
  expect(m.get()).toBe('some value')
})

test('get() should throw on an empty value', () => {
  const n = option(null)
  expect(n.get).toThrow()
})

test('getOrElse', () => {
  const x = option(null)
  const orValue = x.getOrElse('hi')
  expect(orValue).toBe('hi')
  const y = option('hello')
  expect(y.getOrElse('hi')).toBe('hello')
})

test('map value', () => {
  const x = option('bob')
  const result = x.map(v => v.toUpperCase())
  expect(result).toEqual(option('BOB'))
  const value = result.get()
  expect(value).toBe('BOB')
})

test('map empty value is noop', () => {
  const n = option(null)
  const result = n.map(v => v.toUpperCase())
  expect(result).toEqual(none)
})

test('chaining', () => {
  const a = option('Maybe  ')
  const b = a.map(v => v.trim()).map(v => v.toUpperCase()).get()
  expect(b).toBe('MAYBE')
})

test('flatMap', () => {
  const a = option('hi')
  const result = a.flatMap((v: string): Option<string> => {
    if (v === 'hi') {
      return new Some('world')
    }
    return none
  })
  expect(result).toEqual(new Some('world'))
})

test('get() throws on empty values', () => {
  // $FlowExpectedError
  const fNull = () => new Some(null)
  expect(fNull).toThrow()
  // $FlowExpectedError
  const fUndefined = () => new Some(undefined)
  expect(fUndefined).toThrow()
})

test('filter() to return just', () => {
  const name = option('alex  ')
  const upper = name
    .map(v => v.trim())
    .filter(v => v.length !== 0)
    .map(v => v.toUpperCase())
  expect(upper).toEqual(new Some('ALEX'))
})

test('filter() to return none', () => {
  const name = option('  ')
  const upper = name
    .map(v => v.trim())
    .filter(v => v.length !== 0)
    .map(v => v.toUpperCase())
  expect(upper).toBe(none)
})

describe('exists', () => {
  describe('Some', () => {
    it('should pass the option value into the predicate function', () => {
      const v = new Some('value')
      v.exists(value => expect(value).toEqual('value') === true)
    })

    it('should be true if passed function returns true', () => {
      const v = new Some(12)
      expect(v.exists(() => true)).toBeTruthy()
    })
  })

  describe('None', () => {
    it('should be false', () => {
      const v = new None()
      expect(v.exists(() => true)).toBeFalsy()
    })

    it('should not invoke predicate function', () => {
      const v = new None()
      v.exists(() => {
        throw Error('this shouldnt execute')
      })
    })
  })
})

// TODO: Add more tests. https://github.com/kengorab/optionals/blob/master/test/match.spec.js
