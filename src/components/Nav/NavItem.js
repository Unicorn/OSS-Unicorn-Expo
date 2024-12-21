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
exports.NavItem = exports.navItemVariants = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var restyle_1 = require("@shopify/restyle");
var NavIcon_1 = require("./NavIcon");
var NavText_1 = require("./NavText");
var themeKey = 'navItemVariants';
exports.navItemVariants = {
    defaults: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: 's',
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.navItemVariants.defaults })], react_native_1.Pressable);
var NavItem = function (_a) {
    var active = _a.active, icon = _a.icon, label = _a.label, showIcon = _a.showIcon, showLabel = _a.showLabel, props = __rest(_a, ["active", "icon", "label", "showIcon", "showLabel"]);
    var renderChildren = function (_a) {
        var pressed = _a.pressed, hovered = _a.hovered;
        return (<react_1.Fragment>
        {showIcon && icon && <NavIcon_1.NavIcon name={icon} variant={active ? 'active' : hovered ? 'hovered' : 'defaults'}/>}
        {showLabel && <NavText_1.NavText label={label} variant={active ? 'active' : hovered ? 'hovered' : 'defaults'}/>}
      </react_1.Fragment>);
    };
    return <Styled {...props}>{renderChildren}</Styled>;
};
exports.NavItem = NavItem;
