'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

function removeTextsFromStart(change, range) {
    var startKey = range.startKey,
        startOffset = range.startOffset;
    var document = change.value.document;

    var block = document.getClosestBlock(startKey);
    if (!block) return change;

    var cellRange = _slate.Range.create().moveAnchorTo(startKey, startOffset).moveFocusToEndOf(block);
    return change.deleteAtRange(cellRange);
}
exports.default = removeTextsFromStart;