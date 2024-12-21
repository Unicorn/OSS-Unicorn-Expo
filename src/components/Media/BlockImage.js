"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockImage = exports.blockImageVariants = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var useResponsive_1 = require("../../hooks/useResponsive");
var themeKey = "blockImageVariants";
exports.blockImageVariants = {
    defaults: {
        borderWidth: 2,
        flex: 1,
        maxHeight: (0, useResponsive_1.responsiveDimensions)().height,
        height: "100%",
        width: "100%",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.blockImageVariants.defaults })], react_native_1.Image);
var BlockImage = function (_a) {
    var props = __rest(_a, []);
    return <Styled {...props}/>;
};
exports.BlockImage = BlockImage;
