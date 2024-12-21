"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heroStyles = exports.Hero = exports.heroVariants = void 0;
var react_native_1 = require("react-native");
var restyle_1 = require("@shopify/restyle");
var Overlay_1 = require("../Visual/Overlay");
var useResponsive_1 = require("../../hooks/useResponsive");
var themeKey = "heroVariants";
exports.heroVariants = {
    defaults: {
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    fullscreen: {
        margin: 0,
        minHeight: {
            mobile: (0, useResponsive_1.responsiveDimensions)().height - 150,
            tablet: "100dvh",
            desktop: "100dvh",
        },
        width: "100%",
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.heroVariants.defaults })], react_native_1.View);
var Hero = function (_a) {
    var children = _a.children, variant = _a.variant, imageProps = _a.imageProps;
    return (<Styled variant={variant}>
      <react_native_1.ImageBackground {...imageProps} style={exports.heroStyles.background}>
        <Overlay_1.Overlay />
        {children}
      </react_native_1.ImageBackground>
    </Styled>);
};
exports.Hero = Hero;
exports.heroStyles = react_native_1.StyleSheet.create({
    background: {
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        minHeight: 500,
        position: "relative",
        width: "100%",
    },
});
