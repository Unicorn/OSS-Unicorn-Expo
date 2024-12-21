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
exports.Header = exports.headerVariants = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var themeKey = "headerVariants";
exports.headerVariants = {
    defaults: {
        color: "text_color",
    },
    h2: {
        fontSize: {
            mobile: 28,
            tablet: 32,
            desktop: 36,
        },
        fontWeight: "normal",
        paddingVertical: "m",
    },
    h3: {
        fontSize: {
            mobile: 16,
            tablet: 18,
            desktop: 20,
        },
        fontWeight: "normal",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.headerVariants.defaults })], react_native_1.Text);
var Header = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return <Styled {...props}>{children}</Styled>;
};
exports.Header = Header;
