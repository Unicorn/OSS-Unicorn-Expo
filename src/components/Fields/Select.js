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
exports.selectStyles = exports.Select = exports.SelectBase = exports.selectVariants = void 0;
var restyle_1 = require("@shopify/restyle");
var react_1 = require("react");
var react_native_1 = require("react-native");
var Button_1 = require("../../components/Button");
var Base_1 = require("../Base");
var config_1 = require("../../config");
var helpers_1 = require("../../helpers");
var themeKey = "selectVariants";
var stubbedOptions = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
];
exports.selectVariants = {
    defaults: {
        position: "relative",
        zIndex: 900,
    },
};
var Styled = (0, restyle_1.createRestyleComponent)([(0, restyle_1.createVariant)({ themeKey: themeKey, defaults: exports.selectVariants.defaults })], react_native_1.View);
var SelectBase = function (_a) {
    var variant = _a.variant, label = _a.label, _b = _a.labelType, labelType = _b === void 0 ? "button" : _b, style = _a.style, _c = _a.options, options = _c === void 0 ? stubbedOptions : _c, selected = _a.selected, onSelect = _a.onSelect, disabled = _a.disabled, defaultValue = _a.defaultValue, props = __rest(_a, ["variant", "label", "labelType", "style", "options", "selected", "onSelect", "disabled", "defaultValue"]);
    var _selected = typeof selected === "object" ? selected : options.filter(function (o) { return o.value === selected; })[0];
    var colors = (0, restyle_1.useTheme)().colors;
    var _d = (0, react_1.useState)(false), opened = _d[0], setOpened = _d[1];
    var _e = (0, react_1.useState)(_selected !== null && _selected !== void 0 ? _selected : options[0]), selectedOption = _e[0], setSelectedOption = _e[1];
    var animation = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var toggleDropdown = function () {
        if (opened) {
            react_native_1.Animated.timing(animation, {
                toValue: 0,
                duration: 500,
                useNativeDriver: (0, helpers_1.isNativeDriver)(),
            }).start();
        }
        else {
            react_native_1.Animated.timing(animation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: (0, helpers_1.isNativeDriver)(),
            }).start();
        }
        setOpened(!opened);
    };
    var selectHandler = function (option) {
        setSelectedOption(option);
        onSelect && onSelect(option);
        toggleDropdown();
    };
    var renderLabel = function () {
        var C = labelType === "plain" ? react_native_1.Pressable : Button_1.Button;
        return (<C onPress={toggleDropdown} active={opened}>
        {label ? label : selected ? _selected.label : selectedOption.label}
      </C>);
    };
    (0, react_1.useEffect)(function () {
        if (defaultValue) {
            var defaultOption = options.filter(function (o) { return o.label === defaultValue; })[0];
            if (defaultOption) {
                setSelectedOption(defaultOption);
            }
        }
    }, [defaultValue]);
    return (<Styled {...props} style={disabled && exports.selectStyles.disabled}>
      {renderLabel()}

      {opened && !disabled && (<react_native_1.Animated.View style={[
                style,
                exports.selectStyles.list,
                {
                    backgroundColor: colors.field_select_menu_background,
                    opacity: animation,
                    marginTop: variant === "menu" ? 0 : config_1.spacing.s,
                    minWidth: 200,
                },
            ]}>
          <react_native_1.ScrollView style={{ borderRadius: style["borderRadius"], minWidth: 200 }}>
            {options.map(function (item, index) { return (<Button_1.Button key={index} active={selectedOption === item} variant="select" style={{ paddingVertical: variant === "menu" ? config_1.spacing.s : undefined }} onPress={function () { return selectHandler(item); }}>
                {item.label}
              </Button_1.Button>); })}
          </react_native_1.ScrollView>
        </react_native_1.Animated.View>)}
    </Styled>);
};
exports.SelectBase = SelectBase;
exports.Select = (0, Base_1.withFeatures)(exports.SelectBase);
exports.selectStyles = react_native_1.StyleSheet.create({
    list: {
        left: 0,
        position: "absolute",
        right: 0,
        maxHeight: 200,
        top: "100%",
        zIndex: 999,
    },
    disabled: {
        opacity: 0.5,
    },
});
