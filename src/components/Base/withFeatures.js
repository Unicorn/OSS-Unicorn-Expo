"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.withFeatures = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var config_1 = require("../../config");
var withFeatures = function (Component) {
    return function (_a) {
        var style = _a.style, elevation = _a.elevation, radius = _a.radius, props = __rest(_a, ["style", "elevation", "radius"]);
        var colors = (0, restyle_1.useTheme)().colors;
        var enhancedStyle = __assign(__assign({ borderRadius: config_1.spacing[radius] }, (elevation &&
            react_native_1.Platform.select({
                ios: {
                    shadowColor: colors.shadow_color,
                    shadowOpacity: 0.2,
                    shadowRadius: config_1.spacing[elevation],
                },
                web: {
                    boxShadow: "0 0 ".concat(config_1.spacing[elevation], "px ").concat(colors.shadow_color, "33"),
                },
            }))), (style !== null && style !== void 0 ? style : {}));
        return <Component style={enhancedStyle} {...props}/>;
    };
};
exports.withFeatures = withFeatures;
