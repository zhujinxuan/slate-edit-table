'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

require('slate');

function ifCollapsed(opts, rootGetFragment, node, range, next) {
    if (range.isCollapsed) {
        return node.getFragmentAtRange(range);
    }
    return next();
}

exports.default = ifCollapsed;