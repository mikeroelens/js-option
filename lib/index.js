'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.none = exports.None = exports.Some = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.opt = opt;
exports.flattenList = flattenList;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Some = exports.Some = function () {
  function Some(val) {
    _classCallCheck(this, Some);

    if (val === null || typeof val === 'undefined') {
      throw Error('Cannot create Some with an empty value: use flowtype!');
    }
    this.value = val;
  }

  _createClass(Some, [{
    key: 'get',
    value: function get() {
      return this.value;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return false;
    }
  }, {
    key: 'isDefined',
    value: function isDefined() {
      return true;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return (0, _lodash2.default)(this.value, value);
    }
  }, {
    key: 'exists',
    value: function exists(predicate) {
      return predicate(this.value);
    }
  }, {
    key: 'filter',
    value: function filter(predicate) {
      if (predicate(this.value)) {
        return this;
      }
      return none;
    }
  }, {
    key: 'flatMap',
    value: function flatMap(transformer) {
      return transformer(this.value);
    }
  }, {
    key: 'map',
    value: function map(transformer) {
      return new Some(transformer(this.value));
    }
  }, {
    key: 'getOrElse',
    value: function getOrElse(other) {
      return this.value;
    }
  }, {
    key: 'orNull',
    value: function orNull() {
      return this.value;
    }
  }, {
    key: 'match',
    value: function match(matcher) {
      return matcher.some(this.value);
    }
  }]);

  return Some;
}();

var None = exports.None = function () {
  function None() {
    _classCallCheck(this, None);
  }

  _createClass(None, [{
    key: 'get',
    value: function get() {
      throw Error('Cannot call get() on a None');
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      return true;
    }
  }, {
    key: 'isDefined',
    value: function isDefined() {
      return false;
    }
  }, {
    key: 'contains',
    value: function contains(value) {
      return false;
    }
  }, {
    key: 'exists',
    value: function exists(predicate) {
      return false;
    }
  }, {
    key: 'filter',
    value: function filter(predicate) {
      return none;
    }
  }, {
    key: 'flatMap',
    value: function flatMap(transformer) {
      return none;
    }
  }, {
    key: 'flatten',
    value: function flatten() {
      return none;
    }
  }, {
    key: 'map',
    value: function map(transformer) {
      return none;
    }
  }, {
    key: 'getOrElse',
    value: function getOrElse(other) {
      return other;
    }
  }, {
    key: 'orNull',
    value: function orNull() {
      return null;
    }
  }, {
    key: 'match',
    value: function match(matcher) {
      return matcher.none();
    }
  }]);

  return None;
}();

var none = exports.none = Object.freeze(new None());

function opt(value) {
  if (value === null || typeof value === 'undefined') {
    return none;
  }

  return new Some(value);
}

function flattenList(list) {
  return list.reduce(function (acc, elem) {
    return elem.match({
      none: function none() {
        return acc;
      },
      some: function some(e) {
        return [].concat(_toConsumableArray(acc), [e]);
      }
    });
  }, []);
}