"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavText = exports.navTextVariants = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var themeKey = "navTextVariants";
exports.navTextVariants = {
    defaults: {
        color: "navItem_normal",
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 1,
    },
    hovered: {
        color: "navItem_hovered",
    },
    active: {
        color: "navItem_active",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.navTextVariants.defaults })], react_native_1.Text);
var NavText = function (_a) {
    var label = _a.label, variant = _a.variant;
    return <Styled variant={variant}>{label}</Styled>;
};
exports.NavText = NavText;
