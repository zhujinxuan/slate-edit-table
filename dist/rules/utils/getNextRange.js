'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

function getNextRange(node, range, shouldFix) {
    var shouldFixStart = shouldFix.shouldFixStart,
        shouldFixEnd = shouldFix.shouldFixEnd;
    var startKey = range.startKey,
        startOffset = range.startOffset,
        endKey = range.endKey,
        endOffset = range.endOffset;

    if (shouldFixStart) {
        var cell = node.getClosestBlock(startKey);
        var row = node.getParent(cell);
        var startText = row.getFirstText();
        startKey = startText.key;
        startOffset = 0;
    }

    if (shouldFixEnd) {
        var _cell = node.getClosestBlock(endKey);
        var _row = node.getParent(_cell);
        var endText = _row.findLastText();
        endKey = endText.key;
        endOffset = endText.text.length;
    }

    return _slate.Range.create().moveAnchorTo(startKey, startOffset).moveFocusTo(endKey, endOffset);
}
exports.default = getNextRange;