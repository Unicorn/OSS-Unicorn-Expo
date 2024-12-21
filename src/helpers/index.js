"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNativeDriver = exports.toggleItemInArray = exports.itemInArray = void 0;
var react_native_1 = require("react-native");
var lodash_1 = require("lodash");
var itemInArray = function (item, items) {
    return items.findIndex(function (s) { return (0, lodash_1.isEqual)(s, item); }) !== -1;
};
exports.itemInArray = itemInArray;
var toggleItemInArray = function (item, items) {
    var found = items.findIndex(function (s) { return (0, lodash_1.isEqual)(s, item); });
    if (found !== -1) {
        return items.filter(function (_, index) { return index !== found; });
    }
    else {
        return __spreadArray(__spreadArray([], items, true), [item], false);
    }
};
exports.toggleItemInArray = toggleItemInArray;
var isNativeDriver = function () {
    return react_native_1.Platform.OS !== "web";
};
exports.isNativeDriver = isNativeDriver;
