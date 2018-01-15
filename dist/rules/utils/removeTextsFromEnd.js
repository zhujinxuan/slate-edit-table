'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

function removeTextsFromEnd(change, range) {
    var endKey = range.endKey,
        endOffset = range.endOffset;
    var document = change.value.document;

    var block = document.getClosestBlock(endKey);

    if (!block) {
        return change;
    }

    var cellRange = _slate.Range.create().moveFocusTo(endKey, endOffset).moveAnchorToStartOf(block);
    return change.deleteAtRange(cellRange);
}
exports.default = removeTextsFromEnd;