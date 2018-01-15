'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

var _isSameTable = require('../utils/isSameTable');

var _isSameTable2 = _interopRequireDefault(_isSameTable);

var _removeAllTextsInCell = require('../utils/removeAllTextsInCell');

var _removeAllTextsInCell2 = _interopRequireDefault(_removeAllTextsInCell);

var _removeTextsFromStart = require('../utils/removeTextsFromStart');

var _removeTextsFromStart2 = _interopRequireDefault(_removeTextsFromStart);

var _removeTextsFromEnd = require('../utils/removeTextsFromEnd');

var _removeTextsFromEnd2 = _interopRequireDefault(_removeTextsFromEnd);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inSameTable(opts, change, range, next) {
    var startKey = range.startKey,
        endKey = range.endKey;
    var document = change.value.document;


    if (!(0, _isSameTable2.default)(opts, document, startKey, endKey)) {
        return next();
    }

    var startBlock = document.getClosest(startKey, function (cell) {
        return cell && cell.object === 'block';
    });
    var endBlock = document.getClosest(endKey, function (cell) {
        return cell && cell.object === 'block';
    });
    var table = document.getAncestors(startBlock).get(-2);
    var startRow = table.getParent(startBlock.key);
    var endRow = table.getParent(endBlock.key);

    change.snapshotSelection();

    var rowsInRange = table.nodes.skipUtil(function (x) {
        return x === startRow;
    }).skip(1).takeUntil(function (x) {
        return x === endRow;
    }).skipLast(1);
    rowsInRange.forEach(function (rowBlock, index) {
        change.removeNodeByKey(rowBlock.key);
        return index;
    });
    startRow.nodes.skipUnitil(function (x) {
        return x === startBlock;
    }).skip(1).forEach(function (cellBlock, index) {
        (0, _removeAllTextsInCell2.default)(change, cellBlock);
        return index;
    });
    endRow.nodes.takeUnitil(function (x) {
        return x === endBlock;
    }).skipLast(1).forEach(function (cellBlock, index) {
        (0, _removeAllTextsInCell2.default)(change, cellBlock);
        return index;
    });
    (0, _removeTextsFromStart2.default)(change, range);
    (0, _removeTextsFromEnd2.default)(change, range);

    return change;
}
exports.default = inSameTable;