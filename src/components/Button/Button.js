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
exports.Button = exports.ButtonBase = exports.buttonVariants = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var vector_icons_1 = require("@expo/vector-icons");
var restyle_1 = require("@shopify/restyle");
var config_1 = require("../../config");
var LoadingIcon_1 = require("../Icons/LoadingIcon");
var Base_1 = require("../Base");
var themeKey = "buttonVariants";
exports.buttonVariants = {
    defaults: {
        alignItems: "center",
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: "row",
        flexWrap: "nowrap",
        gap: "xs",
        justifyContent: "center",
        width: "min-content",
    },
    outlined: {},
    select: {
        borderRadius: 0,
        justifyContent: "flex-start",
        width: "100%",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.buttonVariants.defaults })], react_native_1.Pressable);
var ButtonBase = function (_a) {
    var variant = _a.variant, _b = _a.type, type = _b === void 0 ? "neutral" : _b, size = _a.size, active = _a.active, loading = _a.loading, icon = _a.icon, label = _a.label, children = _a.children, _c = _a.showIcon, showIcon = _c === void 0 ? true : _c, _d = _a.showLabel, showLabel = _d === void 0 ? true : _d, style = _a.style, props = __rest(_a, ["variant", "type", "size", "active", "loading", "icon", "label", "children", "showIcon", "showLabel", "style"]);
    var colors = (0, restyle_1.useTheme)().colors;
    var getColorForState = function (t, state) {
        var v = variant !== null && variant !== void 0 ? variant : "default";
        if (active)
            return colors["button_".concat(v, "_").concat(type, "_").concat(t, "_active")];
        if (state.hovered || state.pressed)
            return colors["button_".concat(v, "_").concat(type, "_").concat(t, "_hover")];
        return colors["button_".concat(v, "_").concat(type, "_").concat(t, "_normal")];
    };
    var buttonStyle = function (state) {
        var sx = (style !== null && style !== void 0 ? style : {});
        var s = {
            borderColor: getColorForState("border", state),
            backgroundColor: getColorForState("background", state),
        };
        switch (size) {
            case "xxs":
                s["paddingHorizontal"] = config_1.spacing.xs;
                s["paddingVertical"] = config_1.spacing.xxs;
                break;
            case "xs":
                s["paddingHorizontal"] = config_1.spacing.s;
                s["paddingVertical"] = config_1.spacing.xxs;
                break;
            case "s":
                s["paddingHorizontal"] = config_1.spacing.m;
                s["paddingVertical"] = config_1.spacing.xs;
                break;
            case "m":
                s["paddingHorizontal"] = config_1.spacing.l;
                s["paddingVertical"] = config_1.spacing.s;
                break;
            case "l":
                s["paddingHorizontal"] = config_1.spacing.xl;
                s["paddingVertical"] = config_1.spacing.s;
                break;
            case "xl":
                s["paddingHorizontal"] = config_1.spacing.xl;
                s["paddingVertical"] = config_1.spacing.s;
                break;
            case "xxl":
                s["paddingHorizontal"] = config_1.spacing.xxl;
                s["paddingVertical"] = config_1.spacing.s;
                break;
            default:
                s["paddingHorizontal"] = config_1.spacing.m;
                s["paddingVertical"] = config_1.spacing.xs;
                break;
        }
        s["shadowOffset"] = { width: 0, height: 2 };
        s["shadowOpacity"] = 0.1;
        s["shadowRadius"] = 2;
        return __assign(__assign({}, s), sx);
    };
    var buildTextStyle = function (state) {
        var s = { color: getColorForState("text", state) };
        s["fontSize"] = config_1.fontSizes[size];
        return s;
    };
    var renderLabel = function (state) {
        if (!showLabel)
            return null;
        if (label || typeof children === "string")
            return (<react_native_1.Text numberOfLines={1} style={buildTextStyle(state)}>
          {label !== null && label !== void 0 ? label : children === null || children === void 0 ? void 0 : children.toString()}
        </react_native_1.Text>);
        return children;
    };
    return (<Styled {...props} variant={variant} style={buttonStyle} children={function (state) {
            var _a;
            return (<react_1.Fragment>
            {loading && <LoadingIcon_1.LoadingIcon style={buildTextStyle(state)}/>}
            {icon && showIcon && <vector_icons_1.MaterialIcons name={icon} style={buildTextStyle(state)} size={(_a = config_1.spacing[size]) !== null && _a !== void 0 ? _a : 18}/>}
            {renderLabel(state)}
          </react_1.Fragment>);
        }}></Styled>);
};
exports.ButtonBase = ButtonBase;
exports.Button = (0, Base_1.withFeatures)(exports.ButtonBase);
