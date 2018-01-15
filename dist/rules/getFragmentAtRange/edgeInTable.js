'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

function edgeInTable(opts, rootGetFragment, node, range, next) {
    var startKey = range.startKey,
        endKey = range.endKey,
        startOffset = range.startOffset,
        endOffset = range.endOffset;


    var startBlock = node.getClosestBlock(startKey);
    var endBlock = node.getClosestBlock(endKey);

    if (startBlock.type === opts.typeCell) {
        var table = node.getAncestors(startBlock.key).get(-2);
        var beforeFragment = rootGetFragment(node, _slate.Range.create().moveAnchorTo(startKey, startOffset).moveFocusToEndOf(table));
        var contentFragment = rootGetFragment(node, _slate.Range.create().moveAnchorToEndOf(table).moveFocusTo(endKey, endOffset));
        return beforeFragment.set('nodes', beforeFragment.nodes.concat(contentFragment.nodes));
    }

    if (endBlock.type === opts.typeCell) {
        var _table = node.getAncestors(endBlock.key).get(-2);
        var afterFragment = rootGetFragment(node, _slate.Range.create().moveAnchorToStartOf(_table).moveFocusTo(endKey, endOffset));
        var _contentFragment = rootGetFragment(node, _slate.Range.create().moveAnchorTo(startKey, startOffset).moveFocusToStartOf(_table));
        return _contentFragment.set('nodes', _contentFragment.nodes.concat(afterFragment.nodes));
    }
    return next();
}
exports.default = edgeInTable;