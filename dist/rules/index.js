'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('slate');

var _index = require('./getFragmentAtRange/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPatch(opts) {
    var patchGetFragmentAtRange = (0, _index2.default)(opts);
    return {
        utils: _extends({}, patchGetFragmentAtRange.utils),
        rules: _extends({}, patchGetFragmentAtRange.rules)
    };
}

exports.default = createPatch;