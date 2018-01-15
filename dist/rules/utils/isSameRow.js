'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

function isSameRow(opts, document, startKey, endKey) {
    var startBlock = document.getClosestBlock(startKey);
    var endBlock = document.getClosestBlock(endKey);
    if (!startBlock || !endBlock || startBlock.type !== opts.typeCell || endBlock.type !== opts.typeCell) {
        return false;
    }
    var startRow = document.getParent(startBlock.key);

    return !!(startRow && startRow.type === opts.typeRow && startRow.nodes.indexOf(endBlock) !== -1);
}
exports.default = isSameRow;