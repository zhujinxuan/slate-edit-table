'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

var _isSameTable = require('../utils/isSameTable');

var _isSameTable2 = _interopRequireDefault(_isSameTable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inSameTable(opts, rootGetFragment, node, range, next) {
    var startKey = range.startKey,
        endKey = range.endKey;

    if (!(0, _isSameTable2.default)(opts, node, startKey, endKey)) {
        return next();
    }
    var startCell = node.getClosestBlock(startKey);
    var endCell = node.getClosestBlock(endKey);
    var firstCell = node.getParent(startCell.key).nodes.first();
    var lastCell = node.getParent(endCell.key).nodes.last();
    if (firstCell !== startCell) {
        var endOffset = range.endOffset;

        var startFixedRange = _slate.Range.create().moveAnchorToStartOf(firstCell).moveFocusTo(endKey, endOffset);
        return rootGetFragment(node, startFixedRange);
    }
    if (lastCell !== endCell) {
        var startOffset = range.startOffset;

        return rootGetFragment(node, _slate.Range.create().moveAnchorTo(startKey, startOffset).moveFocusToEndOf(lastCell));
    }
    return node.getFragmentAtRange(range);
}
// import getNextRange from '../utils/getNextRange';
exports.default = inSameTable;