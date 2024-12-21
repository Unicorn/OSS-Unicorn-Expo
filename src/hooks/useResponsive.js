"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsiveDimensions = responsiveDimensions;
exports.responsiveValue = responsiveValue;
exports.useResponsiveValue = useResponsiveValue;
exports.useResponsiveStyles = useResponsiveStyles;
var react_native_1 = require("react-native");
var react_1 = require("react");
var config_1 = require("../config");
function isResponsiveStyle(style) {
    return style !== null && typeof style === "object" && ("m" in style || "t" in style || "d" in style);
}
function resolveResponsiveStyle(style, width) {
    var _a, _b, _c, _d, _e, _f;
    if (!isResponsiveStyle(style))
        return style;
    // Resolve the final non-object value for React Native components
    var resolvedStyle = width <= config_1.breakpoints.tablet
        ? (_b = (_a = style.m) !== null && _a !== void 0 ? _a : style.t) !== null && _b !== void 0 ? _b : style.d
        : width >= config_1.breakpoints.tablet && width <= config_1.breakpoints.tablet
            ? (_d = (_c = style.t) !== null && _c !== void 0 ? _c : style.d) !== null && _d !== void 0 ? _d : style.m
            : (_f = (_e = style.d) !== null && _e !== void 0 ? _e : style.t) !== null && _f !== void 0 ? _f : style.m;
    return (resolvedStyle !== null && resolvedStyle !== void 0 ? resolvedStyle : style); // Ensure there is a fallback to the default style if no breakpoints are defined
}
function processStyles(styles, width) {
    var processedStyles = {};
    Object.keys(styles).forEach(function (key) {
        var value = styles[key];
        if (isResponsiveStyle(value)) {
            processedStyles[key] = resolveResponsiveStyle(value, width);
        }
        else if (typeof value === "object" && value !== null) {
            processedStyles[key] = processStyles(value, width); // Recursive call
        }
        else {
            processedStyles[key] = value;
        }
    });
    return processedStyles;
}
function responsiveDimensions(view) {
    var dimensions = react_native_1.Dimensions.get(view !== null && view !== void 0 ? view : "window");
    var onChange = function (_a) {
        var window = _a.window;
        dimensions = window;
    };
    react_native_1.Dimensions.addEventListener("change", onChange);
    return dimensions;
}
function responsiveValue(style, width) {
    var w = width !== null && width !== void 0 ? width : react_native_1.Dimensions.get("window").width;
    var s = resolveResponsiveStyle(style, w);
    var onChange = function (_a) {
        var window = _a.window;
        w = window.width;
        s = resolveResponsiveStyle(style, w);
    };
    react_native_1.Dimensions.addEventListener("change", onChange);
    return s;
}
function useResponsiveValue() {
    var _a = (0, react_1.useState)(react_native_1.Dimensions.get("window").width), width = _a[0], setWidth = _a[1];
    (0, react_1.useEffect)(function () {
        var onChange = function (_a) {
            var window = _a.window;
            setWidth(window.width);
        };
        var observer = react_native_1.Dimensions.addEventListener("change", onChange);
        return function () { return observer.remove(); };
    }, []);
    function styleResolver(style) {
        return resolveResponsiveStyle(style, width);
    }
    return styleResolver;
}
function useResponsiveStyles(styles) {
    var _a = (0, react_1.useState)(react_native_1.Dimensions.get("window").width), width = _a[0], setWidth = _a[1];
    (0, react_1.useEffect)(function () {
        var onChange = function (_a) {
            var window = _a.window;
            setWidth(window.width);
        };
        var subscription = react_native_1.Dimensions.addEventListener("change", onChange);
        return function () { return subscription.remove(); };
    }, []);
    return react_native_1.StyleSheet.create(processStyles(styles, width));
}
