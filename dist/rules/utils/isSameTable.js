'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

function isSameTable(opts, document, startKey, endKey) {
    var startBlock = document.getClosestBlock(startKey);
    var endBlock = document.getClosestBlock(endKey);
    if (!startBlock || !endBlock || startBlock.type !== opts.typeCell || endBlock.type !== opts.typeCell) {
        return false;
    }
    var startTable = document.getAncestors(startBlock.key).get(-2);
    var endTable = document.getAncestors(endBlock.key).get(-2);
    return !!(startTable === endTable && startTable && startTable.type === opts.typeTable);
}
exports.default = isSameTable;