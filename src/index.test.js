// @flow

import { opt, none, Some, None, flattenList, type Option } from './'

test('valid values', () => {
  const x: Option<*> = opt(1)
  expect(x.isDefined()).toBe(true)
  expect(x.isEmpty()).toBe(false)
  const y = opt(0)
  expect(y.isDefined()).toBe(true)
  expect(y.isEmpty()).toBe(false)
  const z = opt({})
  expect(z.isDefined()).toBe(true)
  expect(z.isEmpty()).toBe(false)
})

test('empty values', () => {
  const x = opt(null)
  expect(x.isEmpty()).toBe(true)
  expect(x.isDefined()).toBe(false)
  const y = opt(undefined)
  expect(y.isEmpty()).toBe(true)
  expect(y.isDefined()).toBe(false)
})

test('extract value with get()', () => {
  const m = opt('some value')
  expect(m.get()).toBe('some value')
})

test('get() should throw on an empty value', () => {
  const n = opt(null)
  expect(n.get).toThrow()
})

test('getOrElse', () => {
  const x = opt(null)
  const orValue = x.getOrElse('hi')
  expect(orValue).toBe('hi')
  const y = opt('hello')
  expect(y.getOrElse('hi')).toBe('hello')
})

test('map value', () => {
  const x = opt('bob')
  const result = x.map(v => v.toUpperCase())
  expect(result).toEqual(opt('BOB'))
  const value = result.get()
  expect(value).toBe('BOB')
})

test('map empty value is noop', () => {
  const n = opt(null)
  const result = n.map(v => v.toUpperCase())
  expect(result).toEqual(none)
})

test('chaining', () => {
  const a = opt('Maybe  ')
  const b = a.map(v => v.trim()).map(v => v.toUpperCase()).get()
  expect(b).toBe('MAYBE')
})

test('flatMap', () => {
  const a = opt('hi')
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
  const name = opt('alex  ')
  const upper = name
    .map(v => v.trim())
    .filter(v => v.length !== 0)
    .map(v => v.toUpperCase())
  expect(upper).toEqual(new Some('ALEX'))
})

test('filter() to return none', () => {
  const name = opt('  ')
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

test('flattenList() to flatten', () => {
  const list = [new Some('a'), new None(), new Some('b'), new Some('c'), new None()]
  const flattened = flattenList(list)
  expect(flattened).toEqual(['a', 'b', 'c'])
})
// TODO: Add more tests. https://github.com/kengorab/optionals/blob/master/test/match.spec.js
