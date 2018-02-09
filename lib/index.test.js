'use strict';

var _ = require('./');

test('valid values', function () {
  var x = (0, _.opt)(1);
  expect(x.isDefined()).toBe(true);
  expect(x.isEmpty()).toBe(false);
  var y = (0, _.opt)(0);
  expect(y.isDefined()).toBe(true);
  expect(y.isEmpty()).toBe(false);
  var z = (0, _.opt)({});
  expect(z.isDefined()).toBe(true);
  expect(z.isEmpty()).toBe(false);
});

test('empty values', function () {
  var x = (0, _.opt)(null);
  expect(x.isEmpty()).toBe(true);
  expect(x.isDefined()).toBe(false);
  var y = (0, _.opt)(undefined);
  expect(y.isEmpty()).toBe(true);
  expect(y.isDefined()).toBe(false);
});

test('extract value with get()', function () {
  var m = (0, _.opt)('some value');
  expect(m.get()).toBe('some value');
});

test('get() should throw on an empty value', function () {
  var n = (0, _.opt)(null);
  expect(n.get).toThrow();
});

test('getOrElse', function () {
  var x = (0, _.opt)(null);
  var orValue = x.getOrElse('hi');
  expect(orValue).toBe('hi');
  var y = (0, _.opt)('hello');
  expect(y.getOrElse('hi')).toBe('hello');
});

test('map value', function () {
  var x = (0, _.opt)('bob');
  var result = x.map(function (v) {
    return v.toUpperCase();
  });
  expect(result).toEqual((0, _.opt)('BOB'));
  var value = result.get();
  expect(value).toBe('BOB');
});

test('map empty value is noop', function () {
  var n = (0, _.opt)(null);
  var result = n.map(function (v) {
    return v.toUpperCase();
  });
  expect(result).toEqual(_.none);
});

test('chaining', function () {
  var a = (0, _.opt)('Maybe  ');
  var b = a.map(function (v) {
    return v.trim();
  }).map(function (v) {
    return v.toUpperCase();
  }).get();
  expect(b).toBe('MAYBE');
});

test('flatMap', function () {
  var a = (0, _.opt)('hi');
  var result = a.flatMap(function (v) {
    if (v === 'hi') {
      return new _.Some('world');
    }
    return _.none;
  });
  expect(result).toEqual(new _.Some('world'));
});

test('get() throws on empty values', function () {
  // $FlowExpectedError
  var fNull = function fNull() {
    return new _.Some(null);
  };
  expect(fNull).toThrow();
  // $FlowExpectedError
  var fUndefined = function fUndefined() {
    return new _.Some(undefined);
  };
  expect(fUndefined).toThrow();
});

test('filter() to return just', function () {
  var name = (0, _.opt)('alex  ');
  var upper = name.map(function (v) {
    return v.trim();
  }).filter(function (v) {
    return v.length !== 0;
  }).map(function (v) {
    return v.toUpperCase();
  });
  expect(upper).toEqual(new _.Some('ALEX'));
});

test('filter() to return none', function () {
  var name = (0, _.opt)('  ');
  var upper = name.map(function (v) {
    return v.trim();
  }).filter(function (v) {
    return v.length !== 0;
  }).map(function (v) {
    return v.toUpperCase();
  });
  expect(upper).toBe(_.none);
});

describe('exists', function () {
  describe('Some', function () {
    it('should pass the option value into the predicate function', function () {
      var v = new _.Some('value');
      v.exists(function (value) {
        return expect(value).toEqual('value') === true;
      });
    });

    it('should be true if passed function returns true', function () {
      var v = new _.Some(12);
      expect(v.exists(function () {
        return true;
      })).toBeTruthy();
    });
  });

  describe('None', function () {
    it('should be false', function () {
      var v = new _.None();
      expect(v.exists(function () {
        return true;
      })).toBeFalsy();
    });

    it('should not invoke predicate function', function () {
      var v = new _.None();
      v.exists(function () {
        throw Error('this shouldnt execute');
      });
    });
  });
});

test('flattenList() to flatten', function () {
  var list = [new _.Some('a'), new _.None(), new _.Some('b'), new _.Some('c'), new _.None()];
  var flattened = (0, _.flattenList)(list);
  expect(flattened).toEqual(['a', 'b', 'c']);
});
// TODO: Add more tests. https://github.com/kengorab/optionals/blob/master/test/match.spec.js