'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _ifCollapsed = require('./ifCollapsed');

var _ifCollapsed2 = _interopRequireDefault(_ifCollapsed);

var _inSameCell = require('./inSameCell');

var _inSameCell2 = _interopRequireDefault(_inSameCell);

var _inSameRow = require('./inSameRow');

var _inSameRow2 = _interopRequireDefault(_inSameRow);

var _inSameTable = require('./inSameTable');

var _inSameTable2 = _interopRequireDefault(_inSameTable);

var _startAtEndOfTable = require('./startAtEndOfTable');

var _startAtEndOfTable2 = _interopRequireDefault(_startAtEndOfTable);

var _endAtStartOfTable = require('./endAtStartOfTable');

var _endAtStartOfTable2 = _interopRequireDefault(_endAtStartOfTable);

var _edgeInTable = require('./edgeInTable');

var _edgeInTable2 = _interopRequireDefault(_edgeInTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFragmentRules = [_ifCollapsed2.default, _inSameCell2.default, _inSameRow2.default, _inSameTable2.default, _startAtEndOfTable2.default, _endAtStartOfTable2.default, _edgeInTable2.default];

function bindRules(rules, index, opts, node, range) {
    if (index === rules.length) {
        return node.getFragmentAtRange(range);
    }
    var rule = rules[index];
    var next = function next() {
        return bindRules(rules, index + 1, opts, node, range);
    };
    var rootGetFragment = function rootGetFragment(n, r) {
        return bindRules(getFragmentRules, 0, opts, n, r);
    };
    return rule(opts, rootGetFragment, node, range, next);
}

function convertSingleRule(opts, optsRule) {
    return function (node, rootGet, range, next) {
        return optsRule(opts, rootGet, node, range, next);
    };
}

function makePatch(opts) {
    return {
        rules: {
            getFragmentAtRange: getFragmentRules.map(function (rule) {
                return convertSingleRule(opts, rule);
            })
        },
        utils: {
            getFragmentAtRange: function getFragmentAtRange(node, range) {
                return bindRules(getFragmentRules, 0, opts, node, range);
            }
        }
    };
}

exports.default = makePatch;