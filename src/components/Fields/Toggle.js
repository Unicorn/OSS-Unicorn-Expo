"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toggle = exports.toggleVariants = void 0;
var restyle_1 = require("@shopify/restyle");
var react_1 = require("react");
var react_native_1 = require("react-native");
var helpers_1 = require("../../helpers");
var themeKey = 'toggleVariants';
exports.toggleVariants = {
    defaults: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.toggleVariants.defaults })], react_native_1.View);
var Toggle = function () {
    var colors = (0, restyle_1.useTheme)().colors;
    var _a = (0, react_1.useState)(false), isToggled = _a[0], setIsToggled = _a[1];
    var animate = (0, react_1.useState)(new react_native_1.Animated.Value(0))[0];
    var toggleSwitch = function () {
        var finalValue = isToggled ? 0 : 1;
        setIsToggled(!isToggled);
        react_native_1.Animated.timing(animate, {
            toValue: finalValue,
            duration: 200,
            useNativeDriver: (0, helpers_1.isNativeDriver)(),
        }).start();
    };
    var circleTransform = animate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 30],
    });
    return (<react_native_1.View>
      <react_native_1.Pressable onPress={toggleSwitch} style={[styles.switchContainer, { backgroundColor: isToggled ? colors.fieldAccentFocused : colors.fieldAccent_normal }]}>
        <react_native_1.Animated.View style={[styles.switch, { transform: [{ translateX: circleTransform }] }]}/>
      </react_native_1.Pressable>
    </react_native_1.View>);
};
exports.Toggle = Toggle;
var styles = react_native_1.StyleSheet.create({
    switchContainer: {
        width: 60,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        padding: 5,
    },
    switch: {
        width: 20,
        height: 20,
        backgroundColor: 'white',
        borderRadius: 10,
    },
});
