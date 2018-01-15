'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

function startAtEndOfTable(opts, rootGetFragment, node, range, next) {
    var startKey = range.startKey,
        startOffset = range.startOffset;


    var startBlock = node.getClosestBlock(startKey);
    if (!startBlock || startBlock.type !== opts.typeCell) {
        return next();
    }

    var table = node.getAncestors(startBlock.key).get(-2);
    var startText = table.getLastText();
    if (startText.key !== startKey || startText.text.length !== startOffset) {
        return next();
    }

    var nextText = node.getNextText(startKey);
    if (!nextText) {
        return node.getFragmentAtRange(range);
    }
    var nextRange = _slate.Range.create().moveAnchorToStartOf(nextText).moveFocusTo(range.endKey, range.endOffset);

    return rootGetFragment(node, nextRange);
}
exports.default = startAtEndOfTable;