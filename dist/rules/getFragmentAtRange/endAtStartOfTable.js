'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

function endAtStartOfTable(opts, rootGetFragment, node, range, next) {
    var endKey = range.endKey,
        endOffset = range.endOffset;


    var endBlock = node.getClosestBlock(endKey);
    if (!endBlock || endBlock.type !== opts.typeCell) {
        return next();
    }
    var table = node.getAncestors(endBlock.key).get(-2);
    if (table.getFirstText().key !== endKey || endOffset !== 0) {
        return next();
    }

    var prevText = node.getPreviousText(endKey);

    if (!prevText) {
        return node.getFragmentAtRange(range);
    }

    var prevRange = _slate.Range.create().moveAnchorTo(range.startKey, range.startOffset).moveFocusToEndOf(prevText);

    return rootGetFragment(node, prevRange);
}
exports.default = endAtStartOfTable;