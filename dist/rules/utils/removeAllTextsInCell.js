'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

function removeAllTextsInCell(change, node) {
    var cellRange = _slate.Range.create().moveToRangeOf(node);
    return change.deleteAtRange(cellRange);
}
exports.default = removeAllTextsInCell;