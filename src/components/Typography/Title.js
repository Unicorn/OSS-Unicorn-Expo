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
exports.Title = exports.titleVariants = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var config_1 = require("../../config");
var themeKey = "titleVariants";
exports.titleVariants = {
    defaults: {
        color: "text_color",
        fontFamily: config_1.fonts.body,
        fontSize: {
            mobile: 32,
            tablet: 36,
            desktop: 40,
        },
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 18,
        paddingVertical: 0,
    },
};
var StyledH1 = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.titleVariants.defaults })], react_native_1.Text);
var StyledText = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.titleVariants.defaults })], react_native_1.Text);
var Title = function (_a) {
    var children = _a.children, _b = _a.variant, variant = _b === void 0 ? "defaults" : _b, props = __rest(_a, ["children", "variant"]);
    var StyledElement = variant === "defaults" ? StyledH1 : StyledText;
    if (variant === "hidden")
        return null;
    return (<StyledElement variant={variant} {...props}>
      {children}
    </StyledElement>);
};
exports.Title = Title;
