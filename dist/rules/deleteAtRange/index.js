'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _inSameCell = require('./inSameCell');

var _inSameCell2 = _interopRequireDefault(_inSameCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deleteAtRangeRules = [_inSameCell2.default];

function bindRules(rules, index, opts, change, range) {
    if (index === rules.length) {
        return change.deleteAtRange(range);
    }
    var rule = rules[index];
    var next = function next() {
        return bindRules(rules, index + 1, opts, change, range);
    };
    return rule(opts, change, range, next);
}

function convertSingleRule(opts, optsRule) {
    return function (change, range, next) {
        return optsRule(opts, change, range, next);
    };
}

function makePatch(opts) {
    return {
        rules: {
            deleteAtRange: deleteAtRangeRules.map(function (rule) {
                return convertSingleRule(opts, rule);
            })
        },
        changes: {
            deleteAtRange: function deleteAtRange(change, range) {
                return bindRules(deleteAtRangeRules, 0, opts, change, range);
            }
        }
    };
}

exports.default = makePatch;