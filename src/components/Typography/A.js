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
exports.A = exports.aVariants = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var restyle_1 = require("@shopify/restyle");
var expo_router_1 = require("expo-router");
var themeKey = "aVariants";
exports.aVariants = {
    defaults: {
        color: "link_color",
        position: "relative",
        zIndex: 10,
    },
    hovered: {
        color: "link_hover",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.aVariants.defaults })], expo_router_1.Link);
var A = function (_a) {
    var children = _a.children, href = _a.href, props = __rest(_a, ["children", "href"]);
    var _b = (0, react_1.useState)(false), isHovered = _b[0], setIsHovered = _b[1];
    var hoverHandler = function () { return setIsHovered(true); };
    var leaveHandler = function () { return setIsHovered(false); };
    var handlePress = function () {
        react_native_1.Linking.canOpenURL(href)
            .then(function (supported) {
            if (supported) {
                react_native_1.Linking.openURL(href);
            }
            else {
                console.error("Don't know how to open this URL: " + href);
            }
        })
            .catch(function (err) { return console.error("An error occurred", err); });
    };
    return (<Styled href={href} variant={isHovered ? "hovered" : "defaults"} onPressIn={hoverHandler} onPressOut={leaveHandler} onPress={handlePress} {...props}>
      {children}
    </Styled>);
};
exports.A = A;
