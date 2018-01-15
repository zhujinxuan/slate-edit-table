'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

function isSameCell(opts, document, startKey, endKey) {
    var startBlock = document.getClosestBlock(startKey);
    var endBlock = document.getClosestBlock(endKey);
    return !!(startBlock && startBlock === endBlock && startBlock.type === opts.typeCell && endBlock.type === opts.typeCell);
}
exports.default = isSameCell;