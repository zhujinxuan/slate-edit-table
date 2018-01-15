'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _isSameCell = require('../utils/isSameCell');

var _isSameCell2 = _interopRequireDefault(_isSameCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inSameCell(opts, rootGetFragment, node, range, next) {
    var startKey = range.startKey,
        endKey = range.endKey;

    if (startKey === endKey) {
        return node.getFragmentAtRange(range);
    }

    if ((0, _isSameCell2.default)(opts, node, startKey, endKey)) {
        return node.getFragmentAtRange(range);
    }
    return next();
}
exports.default = inSameCell;