"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Overlay = exports.overlayVariants = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var themeKey = "overlayVariants";
exports.overlayVariants = {
    defaults: {
        backgroundColor: "overlay_background",
        bottom: 0,
        height: "100%",
        left: 0,
        opacity: 0.8,
        position: "absolute",
        right: 0,
        top: 0,
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.overlayVariants.defaults })], react_native_1.View);
var Overlay = function () {
    return <Styled />;
};
exports.Overlay = Overlay;
