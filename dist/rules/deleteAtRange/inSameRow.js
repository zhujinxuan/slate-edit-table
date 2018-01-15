'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

var _isSameRow = require('../utils/isSameRow');

var _isSameRow2 = _interopRequireDefault(_isSameRow);

var _removeAllTextsInCell = require('../utils/removeAllTextsInCell');

var _removeAllTextsInCell2 = _interopRequireDefault(_removeAllTextsInCell);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function inSameRow(opts, change, range, next) {
    var startKey = range.startKey,
        endKey = range.endKey;
    var document = change.value.document;


    if (!(0, _isSameRow2.default)(opts, document, startKey, endKey)) {
        return next();
    }

    var startBlock = document.getClosest(startKey, function (cell) {
        return cell && cell.object === 'block';
    });
    var endBlock = document.getClosest(endKey, function (cell) {
        return cell && cell.object === 'block';
    });

    // Snapshot the selection, which creates an extra undo save point, so that
    // when you undo a delete, the expanded selection will be retained.
    change.snapshotSelection();
    var blocks = document.getBlocksAtRange(range);
    blocks.forEach(function (block, index) {
        if (block === startBlock) {
            var cellRange = _slate.Range.create.moveFocusToEndOf(block).moveAnchorTo(startKey, range.startOffset);
            change.deleteAtRange(cellRange);
            return index;
        }
        if (block === endBlock) {
            var _cellRange = _slate.Range.create.moveAnchorToStartOf(block).moveFocusTo(endKey, range.endOffset);
            change.deleteAtRange(_cellRange);
            return index;
        }
        (0, _removeAllTextsInCell2.default)(change, block);
        return index;
    });
    return change;
}
exports.default = inSameRow;