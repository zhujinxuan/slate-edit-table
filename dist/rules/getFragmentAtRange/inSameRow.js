'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _isSameRow = require('../utils/isSameRow');

var _isSameRow2 = _interopRequireDefault(_isSameRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inSameRow(opts, rootGetFragment, node, range, next) {
    var startKey = range.startKey,
        endKey = range.endKey;

    if ((0, _isSameRow2.default)(opts, node, startKey, endKey)) {
        return node.getFragmentAtRange(range);
    }
    return next();
}

exports.default = inSameRow;