"use strict";
/** @format */
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
exports.pageStyles = exports.Page = exports.pageVariants = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var restyle_1 = require("@shopify/restyle");
var themeKey = 'pageVariants';
exports.pageVariants = {
    defaults: {
        backgroundColor: 'page_background',
        flex: 1,
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.pageVariants.defaults })], react_native_1.View);
exports.Page = (0, react_1.forwardRef)(function (_a, ref) {
    var children = _a.children, scrollProps = _a.scrollProps, props = __rest(_a, ["children", "scrollProps"]);
    return (<Styled {...props}>
      <react_native_1.ScrollView {...scrollProps} ref={ref}>
        {children}
      </react_native_1.ScrollView>
    </Styled>);
});
exports.pageStyles = react_native_1.StyleSheet.create({});
