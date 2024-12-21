"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dividerStyles = exports.Divider = exports.dividerVariants = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var config_1 = require("../../config");
var themeKey = "dividerVariants";
exports.dividerVariants = {
    defaults: {
        alignSelf: "center",
        borderTopWidth: 2,
        borderTopColor: "divider_color",
        marginTop: "xs",
        width: "100%",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.dividerVariants.defaults })], react_native_1.View);
var Divider = function (props) {
    return <Styled {...props} style={exports.dividerStyles.wrapper}/>;
};
exports.Divider = Divider;
exports.dividerStyles = react_native_1.StyleSheet.create({
    wrapper: {
        maxWidth: config_1.breakpoints.desktop,
    },
});
