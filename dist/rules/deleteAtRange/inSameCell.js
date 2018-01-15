'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _isSameCell = require('../utils/isSameCell');

var _isSameCell2 = _interopRequireDefault(_isSameCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inSameCell(opts, change, range, next) {
    var startKey = range.startKey,
        endKey = range.endKey;

    if (startKey === endKey) {
        return change.deleteAtRange(range);
    }
    var document = change.value.document;

    if ((0, _isSameCell2.default)(opts, document, startKey, endKey)) {
        return change.deleteAtRange(range);
    }
    return next();
}
exports.default = inSameCell;