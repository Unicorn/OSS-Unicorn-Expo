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
Object.defineProperty(exports, "__esModule", { value: true });
exports.navStyles = exports.Nav = exports.navVariants = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var config_1 = require("../../config");
var themeKey = "navVariants";
exports.navVariants = {
    defaults: {
        alignItems: "center",
        backgroundColor: "nav_background",
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: "l",
        paddingVertical: "s",
        position: "relative",
        width: "100%",
    },
    sub: {
        backgroundColor: "subnav_background",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.navVariants.defaults })], react_native_1.View);
var Nav = function (_a) {
    var variant = _a.variant, elevation = _a.elevation, style = _a.style, children = _a.children;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var colors = (0, restyle_1.useTheme)().colors;
    var styles = (style !== null && style !== void 0 ? style : {});
    styles = __assign(__assign({}, styles), (elevation &&
        react_native_1.Platform.select({
            ios: {
                shadowColor: colors.shadow_color,
                shadowOpacity: 0.2,
                shadowRadius: config_1.spacing[elevation],
            },
            web: {
                boxShadow: "0 0 ".concat(config_1.spacing[elevation], "px ").concat(colors.shadow_color),
            },
        })));
    return (<Styled variant={variant} style={styles}>
      <react_native_1.View style={[exports.navStyles.navContainer, { paddingTop: insets.top }]}>{children}</react_native_1.View>
    </Styled>);
};
exports.Nav = Nav;
exports.navStyles = react_native_1.StyleSheet.create({
    navContainer: {
        alignItems: "center",
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        maxWidth: config_1.breakpoints.desktop,
        width: "100%",
    },
});
